import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import centerModel from "../models/centerModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const {name, email, motto, location, password, description, category} = req.body;

        // VALIDATIONS
        if(!name) return res.send({message: 'Name is Required'});
        if(!email) return res.send({message: 'Email is Required'});
        if(!password) return res.send({message: 'Password is Required'});
        if(!location) return res.send({message: 'Location is Required'});
        if(!description) return res.send({message: 'Description is Required'});
        if(!motto) return res.send({message: 'Motto is Required'});
        if(!category) return res.send({message: 'Category is Required'});
        
        //CHECK FOR EXISTING CENTER
        const existingCenter = await centerModel.findOne({email});
        if(existingCenter){
            return res.status(200).send({
                success: false,
                message: 'Already Registered, Please login'
            })
        }

        // REGISTER CENTER
        const hashedPassword = await hashPassword(password);

        // SAVE
        const center = new centerModel({name, email, password: hashedPassword, location, description, motto, category});
        await center.save();
        
        res.status(201).send({
            success: true,
            message: 'Center Registered Successfully',
            center
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
        
        const center = await centerModel.findOne({email});
        if(!center){
            return res.status(200).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        const match = await comparePassword(password, center.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // TOKEN
        const token = await JWT.sign({_id: center._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({
            success: true,
            message: 'Login successful',
            center: {
                name: center.name,
                email: center.email,
                location: center.location,
                motto: center.motto,
                description: center.description,
                category: center.category
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