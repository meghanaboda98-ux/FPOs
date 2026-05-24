import API from "./api";

export const getAllInventory = async (

  search = "",
  status = "",
  category = "",
  page = 1

) => {

  const response = await API.get(
    `/inventory/all?search=${search}&status=${status}&category=${category}&page=${page}`
  );

  return response.data;
};
export const createInventory = async (data) => {

  const response = await API.post(
    "/inventory/add",
    data
  );

  return response.data;
};


export const dispatchInventory =
  async (batchId) => {

    const response = await API.put(
      `/inventory/dispatch/${batchId}`
    );

    return response.data;
};

export const deleteInventory =
  async (batchId) => {

    const response = await API.delete(
      `/inventory/delete/${batchId}`
    );

    return response.data;
};

export const updateInventory =
  async (batchId, data) => {

    const response = await API.put(

      `/inventory/update/${batchId}`,

      data
    );

    return response.data;
};