import React, { useEffect, useState } from 'react';
import { List, arrayMove } from "react-movable";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from '../../../services/operations/categoryApi';
import { toast } from 'react-toastify';

export default function DashboardCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        // setLoading(true);
        try {
            const res = await getAllCategories();
            setCategories(res);
        } catch (err) {
            console.error('Error fetching categories data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = async ({ oldIndex, newIndex }) => {
        const updatedCategories = arrayMove(categories, oldIndex, newIndex);
        setCategories(updatedCategories);

        const categoriesToUpdate = updatedCategories.map((cat, index) => ({
            id: categories[index].id,
            category: cat.category
        }));

        try {
            setLoading(true);
            const res = await updateCategory(categoriesToUpdate);

            if (!res) {
                throw new Error('Failed to update categories');
            }

            toast.success("Categories updated successfully!");
        } catch (err) {
            console.error('Error updating categories:', err);
            toast.error('Failed to update categories. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;

        const newCat = { category: newCategory };
        try {
            setLoading(true);
            const res = await createCategory(newCat);

            if (!res) {
                throw new Error('Failed to add category');
            }

            setNewCategory('');
            await fetchCategories();
            toast.success("Category added successfully!");
        } catch (err) {
            console.error('Error adding category:', err);
            toast.error('Failed to add category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            // setLoading(true);
            const res = await deleteCategory(categoryId);

            if (!res) {
                throw new Error('Failed to delete category');
            }

            await fetchCategories();
            toast.success("Category deleted successfully!");
        } catch (err) {
            console.error('Error deleting category:', err);
            toast.error('Failed to delete category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl bg-white rounded-lg shadow-lg">
            {loading ? (
                <div className="flex justify-center items-center space-x-2">
                    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    <span className="text-gray-600">Loading...</span>
                </div>
              
            ) : (
                <>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Manage Categories</h2>
                        <p className="text-sm text-gray-500">Add, delete, or rearrange your categories.</p>
                    </div>
                    
                    <div className="flex mb-6">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter new category"
                            className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-black"
                        />
                        <button
                            onClick={handleAddCategory}
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-all duration-200"
                        >
                            Add
                        </button>
                    </div>
                            
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {categories.length > 0 ? (

                            <List
                            values={categories.map(cat => cat.category)}
                            onChange={handleChange}
                            renderList={({ children, props }) => (
                                <ul {...props} className="space-y-3">{children}</ul>
                            )}
                            renderItem={({ value, props, index }) => (
                                <li {...props} key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                                    <span className="text-gray-700">{value}</span>
                                    <button
                                        onClick={() => handleDeleteCategory(categories[index].id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
                                    >
                                        Delete
                                    </button>
                                </li>
                            )}
                            />
                        ) : (
                            <p className="text-gray-700 text-center">No categories found.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
