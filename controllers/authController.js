import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const {name, email, password, address} = req.body;

        // VALIDATIONS
        if(!name) return res.send({message: 'Name is Required'});
        if(!email) return res.send({message: 'Email is Required'});
        if(!password) return res.send({message: 'Password is Required'});
        if(!address) return res.send({message: 'Address is Required'});
        
        //CHECK FOR EXISTING USER
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'Already Registered, Please login'
            })
        }

        // REGISTER USER
        const hashedPassword = await hashPassword(password);

        // SAVE
        const user = new userModel({name, email, password: hashedPassword, address});
        await user.save();
        
        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
};


export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // TOKEN
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

// export const forgotPasswordController = async (req, res) => {
//     try {
//         const {email, answer, newPassword} = req.body;
//         if(!email){
//             res.status(200).send({message: "Email is required"})
//         }
//         if(!answer){
//             res.status(200).send({message: "Answer is required"})
//         }
//         if(!newPassword){
//             res.status(200).send({message: "New Password is required"})
//         }

//         const user = await userModel.findOne({email, answer});
//         if(!user){
//             return res.status(200).send({
//                 success: false,
//                 message: 'Wrong Email or Answer'
//             })
//         }

//         const hashed = await hashPassword(newPassword);
//         await userModel.findByIdAndUpdate(user._id, {password: hashed});
//         res.status(200).send({
//             success: true,
//             message: 'Password Reset Successful'
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Something Went Wrong",
//             error
//         })
//     }
// }

// export const testController = (req, res) => {
//     try {
//         res.send(`protected route`)
//     } catch (error) {
//         console.log(error);
//         res.send({error});
//     }
    
// }