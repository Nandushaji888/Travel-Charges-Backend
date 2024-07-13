import mongoose from "mongoose";

const passengerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  zeroCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ZeroCard",
  },

  type: {
    type: String,
    enum: ["Adult", "Kid", "Senior Citizen"],
  },
});

export const Passenger = mongoose.model("Passenger", passengerSchema);
