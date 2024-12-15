import mongoose from "mongoose";

const NewsStoriesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,
            required: true,
        },
        slides: [
            {
                image: {
                    type: String,
                    required: true
                },
                caption: {
                    type: String
                }
            },
        ],
    },
    {
        timestamps: true
    }
);

const NewsStories = mongoose.model("NewsStories", NewsStoriesSchema);

export default NewsStories;
