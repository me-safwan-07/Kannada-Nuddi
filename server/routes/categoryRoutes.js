import express from 'express'; 
import { 
    addCategories, 
    deleteCategory, 
    getCategories, 
    updateCategories, 
    updateSingleCategories
} from '../controllers/category.Controller.js';


const router = express.Router();

// Routes for blog operations
router.get('/', getCategories); 
router.post('/add', addCategories);
router.delete('/delete/:id', deleteCategory);
router.put('/update/:id', updateSingleCategories);
router.put('/update', updateCategories);

export default router;