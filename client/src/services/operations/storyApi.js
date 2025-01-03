import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiConnector';

import { storysEndpoints } from '../apis'

const { STORY_API } = storysEndpoints;

//=========================== Get all news=======================
export const getAllStory = async () => {
    const toastId = toast.loading("Loading news...");
    let result = [];

    try {
        const response = await apiConnector("GET", STORY_API);
        if (!response.data) {
            throw new Error("Could not Fetch news");
        }
        result = response.data
    } catch (error) {
        console.log("GET_ALL_NEWS API error...........: " + error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//=========================== Create News =======================
// export const createNews = async (newsData) => {
//     const toastId = toast.loading("Creating news...");
//     let result = null;

//     try {
//         const response = await apiConnector("POST", CREATE_NEWS, newsData);
//         if (!response?.data?.success) {
//             throw new Error("Could not create news");
//         }
//         result = response?.data?.data; // Assuming the created news is returned
//         toast.success("News created successfully!");
//     } catch (error) {
//         console.log("CREATE_NEWS API error...........: " + error);
//         toast.error(error.message);
//     }
//     toast.dismiss(toastId);
//     return result;
// }

//=========================== Get Story by ID =======================
export const getStoryById = async (id) => {
    const toastId = toast.loading("Loading news details...");
    let result = null;

    try {
        const response = await apiConnector("GET", `${STORY_API}/${id}`);
        if (!response) {
            throw new Error("Could not fetch news details");
        }
        result = response?.data?.slides; // Assuming the news details are returned
        console.log(result);
    } catch (error) {
        console.log("GET_NEWS_BY_ID API error...........: " + error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//=========================== Update News =======================
// export const updateNews = async (id, newsData) => {
//     const toastId = toast.loading("Updating news...");
//     let result = null;

//     try {
//         const response = await apiConnector("PUT", UPDATE_NEWS.replace(":id", id), newsData);
//         if (!response?.data?.success) {
//             throw new Error("Could not update news");
//         }
//         result = response?.data?.data; // Assuming the updated news is returned
//         toast.success("News updated successfully!");
//     } catch (error) {
//         console.log("UPDATE_NEWS API error...........: " + error);
//         toast.error(error.message);
//     }
//     toast.dismiss(toastId);
//     return result;
// }

// //=========================== Delete News =======================
// export const deleteNews = async (id) => {
//     const toastId = toast.loading("Deleting news...");
//     let result = null;

//     try {
//         const response = await apiConnector("DELETE", DELETE_NEWS.replace(":id", id));
//         if (!response?.data?.success) {
//             throw new Error("Could not delete news");
//         }
//         result = response?.data?.data; // Assuming a confirmation response is returned
//         toast.success("News deleted successfully!");
//     } catch (error) {
//         console.log("DELETE_NEWS API error...........: " + error);
//         toast.error(error.message);
//     }
//     toast.dismiss(toastId);
//     return result;
// }