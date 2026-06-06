import API from "./api";

export const getShipments = async () => {

    const response = await API.get(
        "/shipments/all"
    );

    return response.data;
};


export const createShipment = async (
    data
) => {

    const response = await API.post(
        "/shipments/create",
        data
    );

    return response.data;
};