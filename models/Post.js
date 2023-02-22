import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        // min: 10,
        required: true,
    },
    img: {
        data: Buffer,
        contentType: String,
    },
});

export default mongoose.model("Post", PostSchema);
