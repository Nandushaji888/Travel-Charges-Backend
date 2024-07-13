import { ZeroCards } from "../Model/cardSchema.js";

export const ZeroCardRechargeController=async(req,res)=>{
    try {
        const {ZeroCardNumber,rechargeAmount}=req.body;
        const response=await ZeroCards.updateOne({cardNumber:ZeroCardNumber},{$inc:{balance:rechargeAmount}})
        const updatedCard = await ZeroCards.findOne({cardNumber:ZeroCardNumber})
        if(response.modifiedCount==1){
            return res.status(200).json({updatedCard,message:'Recharge Successfull'})
        }
        return res.status(404).send({ message: "Card not found or balance unchanged" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message:'Error updating balance'})
    }
}