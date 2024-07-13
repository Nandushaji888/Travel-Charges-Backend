import { Journey } from "../Model/journeySchema.js";

export const adminDetailsCollectionController = async (req, res) => {
  try {
    const delhi = await Journey.find({
      from: "New Delhi Railway Station",
    }).populate("passengerId");
    const airport = await Journey.find({ from: "Airport" }).populate(
      "passengerId"
    );

    const calculateSummary = (journeys) => {
      const totalCharge = journeys.reduce((acc, journey) => acc + journey.charge, 0);
      const totalDiscount = journeys.reduce((acc, journey) => acc + journey.discount, 0);

      const passengerCounts = journeys.reduce((acc, journey) => {
        const type = journey.passengerId.type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      const passengerSummary = Object.keys(passengerCounts)
        .map((type) => ({ type, count: passengerCounts[type] }))
        .sort((a, b) => {
          if (b.count === a.count) {
            return a.type.localeCompare(b.type);
          }
          return b.count - a.count;
        });

      return {
        totalCharge,
        totalDiscount,
        passengerSummary,
      };
    };

    const delhiSummary = calculateSummary(delhi);
    const airportSummary = calculateSummary(airport);

    res.status(200).send({
      delhi: delhiSummary,
      airport: airportSummary,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
