import API from "./api";

export const getDashboardSummary = async () => {

    const response = await API.get(
        "/analytics/dashboard-summary"
    );

    return response.data;
};


export const getSpoilageOverview = async () => {

    const response = await API.get(
        "/analytics/spoilage-overview"
    );

    return response.data;
};


export const getTemperatureOverview = async () => {

    const response = await API.get(
        "/analytics/temperature-overview"
    );

    return response.data;
    };