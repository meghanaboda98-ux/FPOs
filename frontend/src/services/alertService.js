import API from "./api";

export const getAllAlerts = async () => {

  const response = await API.get(
    "/alerts/all"
  );

  return response.data;
};