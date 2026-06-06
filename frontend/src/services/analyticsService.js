import API from "./api";

export const getDashboardAnalytics = async () => {

    const response = await API.get(
        "/analytics/dashboard-summary"
    );

    return response.data;
};

export const getCategoryAnalytics = async () => {

    const response = await API.get(
        "/analytics/category-distribution"
    );

    return response.data;
};

export const getStatusAnalytics = async () => {

    const response = await API.get(
        "/analytics/status-distribution"
    );

    return response.data;
};

export const getWarehouseUtilization = async () => {

    const response = await API.get(
        "/analytics/warehouse-utilization"
    );

    return response.data;
};