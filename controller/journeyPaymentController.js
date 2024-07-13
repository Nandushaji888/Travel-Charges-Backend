import { ZeroCards } from "../Model/cardSchema.js";
import { Journey } from "../Model/journeySchema.js";

export const journeyPaymentController = async (req, res) => {
  try {
    console.log('req.body.journeyDetails');
    console.log(req.body.journeyDetails);
    const { lastCharge,discount, ZeroCardNumber, to, from,isReturnJourney } = req.body.journeyDetails;

    if (!ZeroCardNumber || typeof lastCharge !== "number" || lastCharge <= 0) {
      return res.status(400).send({ message: "Invalid input" });
    }
    console.log('heree');

    const cardDetails = await ZeroCards.findOne({
      cardNumber: ZeroCardNumber?.cardNumber,
    });
    if (!cardDetails) {
      return res.status(404).send({ message: "Invalid ZeroCard Details" });
    }
    console.log('2');
    const passengerId = ZeroCardNumber.passengerId;
    const newJourney = new Journey({
      passengerId,
      from,
      to,
      isReturn: isReturnJourney?isReturnJourney:false,
      charge: lastCharge,
      discount,
    });
    console.log('newJourney');
    console.log(newJourney);
    const newJourneyData = await newJourney.save();
    const updatedBalance = await ZeroCards.findOneAndUpdate(
      { cardNumber: ZeroCardNumber?.cardNumber },
      { $inc: { balance: -lastCharge } },
      { new: true }
    );
    // console.log('updatedBalance');
    // console.log(updatedBalance);
    if (!updatedBalance) {
      return res.status(404).send({ message: "Invalid ZeroCard Details or Internal Server Error" });
    }

    return res.status(200).send({message:'Payment Successfull',updatedBalance})

    console.log(newJourneyData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: " Internal Server Error" });

  }
};
