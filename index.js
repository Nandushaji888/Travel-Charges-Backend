import app from "./app.js";
import connectDB from "./DB/connectDB.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  connectDB();

  console.log(`MongoDB connected at port ${PORT}`);
});
