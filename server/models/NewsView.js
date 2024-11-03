import mongoose from 'mongoose';

const NewsViewsSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h'  // Automatically delete after 24 hours
    }
});

const Blog = mongoose.model('NewsView', NewsViewsSchema);

export default Blog;