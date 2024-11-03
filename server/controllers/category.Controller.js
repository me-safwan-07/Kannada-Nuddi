import Category from "../models/Category.js";

export const addCategories = async (req, res, next) => {
    const { category } = req.body;

    if (!category) {
        return res.status(400).json({ message: 'Category is required' });
    }

    const normalizedCategory = category.trim().toLowercase();

    try {
        const existingCategory = await Category.findOne({ category: normalizedCategory });
        if (!existingCategory) {
            await Category.create({ category });
            res.status(201).json({ message: 'Category added successfully' });
        } else {
            res.status(400).json({ message: 'Category already exists' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});

        // Transform the categories to the desired format
        const formattedCategories = categories.map(cat => ({
            id: cat._id, // Change `_id` to `id`
            category: cat.category
        }));

        res.json(formattedCategories);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const updateSingleCategories = async (req, res, next) => {
    const { category } = req.body;

    if (!category) {
        return res.status(400).json({ message: 'Category is required' });
    }

    try {
        const existingCategory = await Category.findById(req.params.id);
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        existingCategory.category = category;
        await existingCategory.save();
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};


export const deleteCategory = async (req, res, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// update the fully category
export const updateCategories = async (req, res, next) => {
    const { categories } = req.body;

    if (!categories || !categories.length) {
        return res.status(400).json({ message: 'No categories to update' });
    }

    try {
        const updatePromises = categories.map(async (cat) => {
            try {
                const existingCategory = await Category.findById(cat.id);
                if (!existingCategory) {
                    return { success: false, id: cat.id, message: 'Category not found' };
                }
                existingCategory.category = cat.category;
                await existingCategory.save();
                return { success: true, id: cat.id };
            } catch (error) {
                return { success: false, id: cat.id, message: error.message };
            }
        });

        const results = await Promise.all(updatePromises);

        // Filter the results to check for any failed updates
        const failedUpdates = results.filter(result => !result.success);
        if (failedUpdates.length > 0) {
            return res.status(400).json({ message: 'Some categories failed to update', failedUpdates });
        }

        res.status(200).json({ message: 'All categories updated successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};