import API from "./api";

export const getRecommendations = async () => {

    const response = await API.get(
        "/recommendation"
    );

    return response.data;
};