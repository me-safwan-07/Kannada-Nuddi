import express from 'express'; 
import { 
  createNews, 
  getNews, 
  getNewsById, 
  deleteNews, 
  updateNews, 
} from '../controllers/news.Controller.js';

const router = express.Router();

// Routes for blog operations
router.post('/create', createNews);          // Create a new blog
router.get('/', getNews);           // Get all blogs
router.get('/:id', getNewsById); // Get
router.delete('/delete/:id', deleteNews); // Delete a blog by ID
router.put('/update/:id', updateNews);   // Update a blog by ID
// router.get('/stats', getBlogStats)

export default router;