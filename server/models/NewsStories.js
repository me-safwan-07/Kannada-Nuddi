import mongoose from "mongoose";

const NewsStoriesSchema = new mongoose.Schema({
    stories : {
        title: {
            type: String,
            required: true
        },
        imageUrl: String,
        caption: String,
        createdAt: { type: Date, default: Date.now },
    }
});

const NewsStories = mongoose.model("NewsStories", NewsStoriesSchema);

export default NewsStories;
