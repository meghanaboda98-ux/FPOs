import API from "./api";


export const getWarehouses = async () => {

    const response = await API.get(
        "/warehouses/all"
    );

    return response.data;
};