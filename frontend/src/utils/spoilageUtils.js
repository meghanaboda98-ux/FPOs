export const getSpoilageColor = (
  spoilage
) => {

  if (spoilage <= 30) {

    return "text-green-600";
  }

  else if (spoilage <= 70) {

    return "text-yellow-600";
  }

  return "text-red-600";
};

export const getSpoilageStatus = (
  spoilage
) => {

  if (spoilage <= 30) {

    return "LOW";
  }

  else if (spoilage <= 70) {

    return "MEDIUM";
  }

  return "HIGH";
};

export const calculateSpoilagePercentage = (
  spoilage
) => {

  return Math.max(
    0,
    Math.min(
      100,
      Number(spoilage)
    )
  );
};