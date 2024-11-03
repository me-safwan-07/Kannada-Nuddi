import Blog from "../models/News.js";
// import NewsView from "../models/NewsView.js";
import { errorHandler } from "../utils/errorHandler.js";

// Create Blog Post
export const create = async (req, res, next) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  // Generate SEO-friendly slug using title and a random number
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBlog = new Blog({
    ...req.body,
    slug,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully.', blog: savedBlog });
  } catch (err) {
    console.error('Error creating blog:', err);
    next(err);
  }
};

// Get All Blogs
export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).sort({ updatedAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

// Get Blog by ID and Track Views
export const getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const userIp = req.ip;

    // Check if this IP has already viewed the blog in the last 24 hours
    const existingView = await NewsView.findOne({
      blogId: blogId,
      ipAddress: userIp,
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }  // Last 24 hours
    });

    if (!existingView) {
      // Increment the view count if this IP hasn't viewed the blog in the last 24 hours
      await Blog.findByIdAndUpdate(blogId, { $inc: { views: 1 } });

      // Add a new entry in the NewsView collection to track the unique view
      const newView = new NewsView({ blogId, ipAddress: userIp });
      await newView.save();
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

// Delete a Blog
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return next(errorHandler(404, 'Blog not found'));
    res.status(204).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    next(err);
  }
};


// Get Blog Stats (views, total blogs)
// export const getBlogStats = async (req, res, next) => {
//   try {
//     // Total number of blogs
//     const totalBlogs = await Blog.countDocuments();

//     // Monthly blog views and counts
//     const blogViewsPerMonth = await Blog.aggregate([
//       {
//         $group: {
//           _id: { month: { $month: "$createdAt" } },
//           totalViews: { $sum: "$views" },
//           totalBlogs: { $sum: 1 }
//         },
//       },
//       { $sort: { '_id.month': 1 } }
//     ]);

//     res.json({ totalBlogs, blogViewsPerMonth });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };