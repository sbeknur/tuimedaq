import mongoose from "mongoose";
const { Schema } = mongoose;

const HelpSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("Help", HelpSchema);
