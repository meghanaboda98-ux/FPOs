export const getQualityColor = (
  quality
) => {

  if (quality >= 80) {

    return "text-green-600";
  }

  else if (quality >= 50) {

    return "text-yellow-600";
  }

  return "text-red-600";
};

export const getQualityStatus = (
  quality
) => {

  if (quality >= 80) {

    return "GOOD";
  }

  else if (quality >= 50) {

    return "AVERAGE";
  }

  return "POOR";
};

export const calculateQualityPercentage = (
  quality
) => {

  return Math.max(
    0,
    Math.min(
      100,
      Number(quality)
    )
  );
};