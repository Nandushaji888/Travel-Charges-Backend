import { ZeroCards } from "../Model/cardSchema.js";

export const findZeroCardDetails =async(req,res)=>{
    try {
        const {journeyDetails}=req.body
        console.log(journeyDetails);
        const cardNumber= journeyDetails?.ZeroCardNumber?.cardNumber
        const updatedCard = await ZeroCards.findOne({cardNumber:cardNumber})
        console.log(updatedCard);
        if(updatedCard){
            return res.status(200).send({updatedCard})
        }
    } catch (error) {
        console.log(error.message);
    }
}