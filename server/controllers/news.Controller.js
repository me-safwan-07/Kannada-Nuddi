import Blog from "../models/News.js";
// import NewsView from "../models/NewsView.js";
import { errorHandler } from "../utils/errorHandler.js";

// Utility function to generate a unique slug
const generateSlug = async (title) => {
  const baseSlug = title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]+/g, '');
  let slug = baseSlug;
  let count = 1;

  // Check for existing slugs and append a number if necessary
  while (await Blog.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};

// Create Blog Post
export const createNews = async (req, res, next) => {
  const { title, content, image, category } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  try {
    const slug = await generateSlug(title);

    const newNews = new Blog({
      title,
      content,
      image,
      category,
      slug,
    });

    const savedBlog = await newNews.save();
    res.status(201).json({ message: 'Blog created successfully.', blog: savedBlog });
  } catch (err) {
    console.error('Error creating blog:', err);
    next(err);
  }
};

// Get All Blogs
export const getNews = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).sort({ updatedAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

// Get Blog by ID and Track Views
export const getNewsById = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Find the blog by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return next(errorHandler(404, "Sorry, we couldn’t find the blog you were looking for."));
    }
    // Increment views
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    res.status(200).json({
      message: "Here is the blog you requested",
      blog
    });
  } catch (err) {
    console.error('Error fetching blog:', err);
    next(errorHandler(500, 'An error occurred while trying to fetch the blog. Please try again later.'));
  }
};

// Delete a Blog
export const deleteNews = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    res.status(200).json({ message: 'Blog deleted successfully.' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    next(err);
  }
};


// Update Blog
export const updateNews = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, image, category } = req.body;

  // Input validation
  if (!title && !content && !image && !category) {
    return res.status(400).json({ message: 'At least one field must be updated.' });
  }

  try {
    // Find and update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id, 
      { 
        $set: {
          title,
          content,
          image,
          category        
        },
      },
      { new: true }
    );

    // Check if the blog was found
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }
    
    // Return the updated blog
    res.status(200).json({
      message: 'Blog updated successfully.',
      blog: updatedBlog
    });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ message: 'An error occurred while updating the blog. Please try again later.' });
    next(err);
  }
};