import React, { useEffect, useState } from 'react';
import { List, arrayMove } from "react-movable";

export default function DashboardCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error('Error fetching categories data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = async ({ oldIndex, newIndex }) => {
        const updatedCategories = arrayMove(categories, oldIndex, newIndex);
        setCategories(updatedCategories);

        const categoriesToUpdate = updatedCategories.map((cat, index) => ({
            id: categories[index].id,
            category: cat.category
        }));

        try {
            setLoading(true);
            const res = await fetch('/api/categories/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categories: categoriesToUpdate })
            });

            if (!res.ok) {
                const errorData = await res.json(); 
                throw new Error(errorData.message || 'Failed to update categories');
            }

            // Reload the page to reflect changes
            window.location.reload();
        } catch (err) {
            console.error('Error updating categories:', err);
            alert('Failed to update categories. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory) return; // Prevent adding empty category

        const newCat = { category: newCategory };
        try {
            setLoading(true);
            const res = await fetch('/api/categories/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCat)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to add category');
            }

            // Reload categories after adding
            setNewCategory(''); // Clear input
            await fetchCategories(); // Refetch categories to include the new one
        } catch (err) {
            console.error('Error adding category:', err);
            alert('Failed to add category. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            {loading ? <p className="text-center">Loading...</p> : (
                <>
                    <div className="flex mb-4">
                        <input 
                            type="text" 
                            value={newCategory} 
                            onChange={(e) => setNewCategory(e.target.value)} 
                            placeholder="New category name"
                            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button 
                            onClick={handleAddCategory} 
                            className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600"
                        >
                            +
                        </button>
                    </div>
                    <List 
                        values={categories.map(cat => cat.category)} 
                        onChange={handleChange} 
                        renderList={({ children, props }) => <ul {...props} className="space-y-2">{children}</ul>}
                        renderItem={({ value, props }) => (
                            <li {...props} className="p-2 border border-gray-300 rounded-md">{value}</li>
                        )}
                    />
                </>
            )}
        </div>
    );
}
