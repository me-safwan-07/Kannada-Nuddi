const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const endpoints = {
  SENDOTP_API: `${BASE_URL}/auth/sendotp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  RESETPASSTOKEN_API: `${BASE_URL}/auth/reset-password-token`,
  RESETPASSWORD_API: `${BASE_URL}/auth/reset-password`,
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: `${BASE_URL}/profile/getUserDetails`,
  GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/profile/getEnrolledCourses`,
  GET_INSTRUCTOR_DATA_API: `${BASE_URL}/profile/instructorDashboard`,
}

// NEWS ENDPOINTS
export const newsEndpoints = {
  GET_ALL_NEWS: `${BASE_URL}/news`,
  CREATE_NEWS: `${BASE_URL}/news/create`,
  GET_NEWS_BY_ID: `${BASE_URL}/news`,
  UPDATE_NEWS: `${BASE_URL}/news/update/`,
  DELETE_NEWS: `${BASE_URL}/news/delete/`,
};


// CATEGORY ENDPOINTS
export const categoryEndpoints = {
    GET_CATEGORIES_API: `${BASE_URL}/category`,
    CREATE_CATEGORY_API: `${BASE_URL}/category/add`,
    GET_SINGLE_CATEGORY_API: `${BASE_URL}/category/:id`,
    UPDATE_CATEGORY_API: `${BASE_URL}/category/update`,
    DELETE_CATEGORY_API: `${BASE_URL}/category/delete/:id`,
};

export const storysEndpoints = {
    STORY_API: `${BASE_URL}/story`,
};