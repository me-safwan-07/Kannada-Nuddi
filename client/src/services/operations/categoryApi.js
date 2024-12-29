import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { categoryEndpoints } from '../apis';

const {
    GET_CATEGORIES_API,
    CREATE_CATEGORY_API,
    GET_SINGLE_CATEGORY_API,
    UPDATE_CATEGORY_API,
    DELETE_CATEGORY_API
} = categoryEndpoints;

//=========================== Get All Categories =======================
export const getAllCategories = async () => {
    const toastId = toast.loading("Loading categories...");
    let result = [];

    try {
        const response = await apiConnector("GET", GET_CATEGORIES_API);
        if (!response) {
            throw new Error("Could not fetch categories");
        }
        result = response.data;
    } catch (error) {
        console.log("GET_ALL_CATEGORIES API error...........: " + error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//=========================== Create Category =======================
export const createCategory = async (categoryData) => {
    const toastId = toast.loading("Creating category...");
    let result = null;

    try {
        const response = await apiConnector("POST", CREATE_CATEGORY_API, categoryData);
        if (!response) {
            throw new Error("Could not create category");
        }
        result = response?.data; // Assuming the created category is returned
        toast.success("Category created successfully!");
    } catch (error) {
        console.log("CREATE_CATEGORY API error...........: " + error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//=========================== Get Category by ID =======================
export const getCategoryById = async (category) => {
    const toastId = toast.loading("Loading category details...");
    let result = null;

    try {
        const response = await apiConnector("GET", GET_SINGLE_CATEGORY_API, category);
        if (!response?.data?.success) {
            throw new Error("Could not fetch category details");
        }
        result = response?.data?.data; // Assuming the category details are returned
    } catch (error) {
        console.log("GET_CATEGORY_BY_ID API error...........: " + error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//=========================== Update Category =======================
export const updateCategory = async (categoryData) => {
    const toastId = toast.loading("Updating category...");
    let result = null;

    try {
        const response = await apiConnector("PUT", UPDATE_CATEGORY_API, {
            categories: categoryData  // Wrap the array inside an object
        });
        
        console.log(response);
        console.log("updated...")
        if (!response) {
            throw new Error("Could not update category");
        }
        result = response; // Assuming the updated category is returned
        toast.success("Category updated successfully!");
    } catch (error) {
        console.log("UPDATE_CATEGORY API error...........: " + error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//=========================== Delete Category =======================
export const deleteCategory = async (id) => {
    const toastId = toast.loading("Deleting category...");
    let result = null;

    try {
        const response = await apiConnector("DELETE", DELETE_CATEGORY_API.replace(":id", id));
        if (!response) {
            throw new Error("Could not delete category");
        }
        result = response?.data; // Assuming a confirmation response is returned
        toast.success("Category deleted successfully!");
    } catch (error) {
        console.log("DELETE_CATEGORY API error...........: " + error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}