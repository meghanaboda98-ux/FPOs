import API from "./api";

export const getAllProducts = async () => {

    const response = await API.get(
        "/products/all"
    );

    return response.data;
};

export const getProductById = async (
    id
) => {

    const response = await API.get(
        `/products/${id}`
    );

    return response.data;
};

export const createProduct = async (
    data
) => {

    const response = await API.post(
        "/products/add",
        data
    );

    return response.data;
};

export const updateProduct = async (
    id,
    data
) => {

    const response = await API.put(
        `/products/update/${id}`,
        data
    );

    return response.data;
};

export const deleteProduct = async (
    id
) => {

    const response = await API.delete(
        `/products/delete/${id}`
    );

    return response.data;
};