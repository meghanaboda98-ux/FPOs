export const validatePhoneNumber = (
  phone
) => {

  const regex =
    /^[6-9]\d{9}$/;

  return regex.test(phone);
};

export const validateEmail = (
  email
) => {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

export const validateRequired = (
  value
) => {

  return (
    value !== undefined &&
    value !== null &&
    value.toString().trim() !== ""
  );
};

export const validatePositiveNumber = (
  value
) => {

  return Number(value) > 0;
};