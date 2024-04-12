import centerModel from "../models/centerModel.js";
import enrollModel from "../models/enrollModel.js";
import planModel from "../models/planModel.js";

export const categoryController = async (req, res) => {
    try {
        const { category } = req.params;
        if ((category != "gym") && (category != "calisthenics") && (category != "yoga") && (category != "sports")) {
            return res.status(200).send({
                success: false,
                message: 'No such category exist',
            })
        }
        let reqCenters = await centerModel.find({ category });
        res.status(200).send({
            success: true,
            message: 'Success',
            reqCenters
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Some error occured',
            error
        })
    }
}

export const centerDetailsController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        let reqCenter = await centerModel.find({ _id:id });
        console.log(reqCenter)
        res.status(200).send({
            success: true,
            message: 'Success',
            reqCenter
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Some error occured',
            error
        })
    }
}

export const centerDetailsEditController = async (req, res) => {
    try {
        const { id } = req.params;
        const {name, motto, location, description, category} = req.body;
        console.log(id,name);
        // let reqCenter = await centerModel.find({ _id:id });
        const result = await centerModel.findOneAndUpdate({_id: id}, {
            location,
            name,
            description,
            motto
        })
        console.log(result);
        res.status(200).send({
            success: true,
            message: 'Success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Some error occured',
            error
        })
    }
}

export const addPlanController = async (req, res) => {
    try {
        const { id } = req.params;
        const {name, price, daysInAMonth, activities} = req.body;
        const activitiesArray=activities.split(',');
        if(!name) return res.send({message: 'Name is Required'});
        if(!price) return res.send({message: 'Price is Required'});
        if(!daysInAMonth) return res.send({message: 'Add atleast one day'});
        if(!activities) return res.send({message: 'Provide atleast one activity'});

        console.log(activitiesArray[0]);
        
        const plan = new planModel({name,price,daysInAMonth,activities:activitiesArray});
        const center=await centerModel.findById({_id:id});
        center.plans.push(plan);
        await plan.save();
        await center.save();

        res.status(200).send({
            success: true,
            message: 'Success',
            plan
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Some error occured',
            error
        })
    }
}

// export const planBuyController = async (req, res) => {
//     try {
//         const { planId,id } = req.params;
//         const enrollment = new enrollModel({});
//         const {name, price, daysInAMonth, activities} = req.body;
//         const activitiesArray=activities.split(',');
//         if(!name) return res.send({message: 'Name is Required'});
//         if(!price) return res.send({message: 'Price is Required'});
//         if(!daysInAMonth) return res.send({message: 'Add atleast one day'});
//         if(!activities) return res.send({message: 'Provide atleast one activity'});

//         console.log(activitiesArray[0]);
        
//         const plan = new planModel({name,price,daysInAMonth,activities:activitiesArray});
//         const center=await centerModel.findById({_id:id});
//         center.plans.push(plan);
//         await plan.save();
//         await center.save();

//         res.status(200).send({
//             success: true,
//             message: 'Success',
//             plan
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: 'Some error occured',
//             error
//         })
//     }
// }