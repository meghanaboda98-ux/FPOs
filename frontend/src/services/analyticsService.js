import API from "./api";

export const getDashboardAnalytics =
  async () => {

    const response = await API.get(
      "/analytics/dashboard"
    );

    return response.data;
};

export const getCategoryAnalytics =
  async () => {

    const response = await API.get(  
      "/analytics/categories"
    );

    return response.data;
};

export const getStatusAnalytics =
  async () => {

    const response = await API.get(
      "/analytics/status"
    );

    return response.data;
};