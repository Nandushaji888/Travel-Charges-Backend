import {
  getPassengerType,
  getUniqueZeroCardNumber,
} from "../helpers/helperMethods.js";
import { ZeroCards } from "../Model/cardSchema.js";
import { Passenger } from "../Model/passengerSchema.js";

export const userSignup = async (req, res) => {
  try {
    const { name, age } = req.body;
    const type = getPassengerType(age);
    const newPassenger = new Passenger({
      name,
      age,
      type,
    });

    const savedPassenger = await newPassenger.save();
    console.log(savedPassenger);
    const cardNumber = getUniqueZeroCardNumber();
    const newCard = new ZeroCards({
      cardNumber,
      passengerId: savedPassenger._id,
    });
    const savedCard = await newCard.save();

    savedPassenger.zeroCardId = savedCard._id;
    await savedPassenger.save();

    console.log(cardNumber);
    return res.status(201).send({message:`please copy the ZeroCard Number ${cardNumber} for booking `})
  } catch (error) {
    console.log(error.message);
  }
};
