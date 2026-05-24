import API from "./api";

export const getAllProducts =
  async () => {

    const response = await API.get(
      "/products/all"
    );

    return response.data;
};

export const createProduct =
  async (data) => {

    const response = await API.post(
      "/products/add",
      data
    );

    return response.data;
};

export const deleteProduct =
  async (productId) => {

    const response = await API.delete(
      `/products/delete/${productId}`
    );

    return response.data;
};