import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    randomKey: {
        type: String,
        required: true,
        unique: true
    },
    originalUrl: {
        type: String,
        required: true
    }
}, { timestamps: true, collection: 'custom_collection_name' });

const Url = mongoose.model("Url", urlSchema);

export default Url;


