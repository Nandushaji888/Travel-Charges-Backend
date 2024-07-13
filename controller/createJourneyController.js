import { response } from "express";
import { chargeToBeDedudcted } from "../helpers/helperMethods.js";
import { ZeroCards } from "../Model/cardSchema.js";
import { Journey } from "../Model/journeySchema.js";
import { Passenger } from "../Model/passengerSchema.js";

export const createJourneyController = async (req, res) => {
  try {
    const { zeroCardNo, to, from } = req.body;
    // console.log(req.body);
    const ZeroCardNumber = await ZeroCards.findOne({ cardNumber: zeroCardNo });
    if (!ZeroCardNumber) {
      console.log("not a valid card number");
      return res.status(400).json({ message: "Give a valid ZeroCard Number " });
    }
    const passengerId = ZeroCardNumber?.passengerId;
    const passenger = await Passenger.findById(passengerId);
    let charge;
    charge = chargeToBeDedudcted(passenger.type);

    const currentDate = new Date();
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const firstJourneyToday = await Journey.findOne({
      passengerId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ createdAt: 1 });
    // const lastJourneyToday = await Journey.findOne({
    //     passengerId,
    //     createdAt: { $gte: startOfDay, $lte: endOfDay },
    //   }).sort({ createdAt: -1 });

    const isReturnJourney =
      firstJourneyToday &&
      firstJourneyToday.from === to &&
      firstJourneyToday.to === from;
    const lastCharge = isReturnJourney ? charge * 0.5 : charge;
    const discount = isReturnJourney ? charge * 0.5 : 0;
    let response;
    if (Number(lastCharge) > Number(ZeroCardNumber?.balance)) {
      response = "insuffient balance";
      return res
        .status(402)
        .json({ ZeroCardNumber, lastCharge, discount, response, to, from });
    }

    return res.status(200).json({
      lastCharge,
      discount,
      ZeroCardNumber,
      to,
      from,
      isReturnJourney,
    });
  } catch (error) {
    console.log("Error in createJourneyController", error.message);
    response = "Internal server error"
    return res.status(500).json({ response });
  }
};
