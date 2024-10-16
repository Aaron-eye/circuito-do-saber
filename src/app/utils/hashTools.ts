export const objectToHash = (obj: Record<string, any>): void => {
  const hash = Object.keys(obj)
    .filter((key) => {
      const value = obj[key];
      // Remove keys with null, undefined, empty strings, or empty arrays
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0)
      );
    })
    .map((key) => {
      const value = obj[key];
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}[]=${encodeURIComponent(value.join(","))}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  window.location.hash = hash;
};

export const hashToObject = (): Record<string, any> => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);

  const result: Record<string, any> = {};

  params.forEach((value, key) => {
    const isArray = key.endsWith("[]");
    const cleanKey = isArray ? key.slice(0, -2) : key;

    if (isArray) {
      if (!result[cleanKey]) {
        result[cleanKey] = [];
      }
      result[cleanKey] = value.split(",").map(decodeURIComponent);
    } else {
      result[cleanKey] = decodeURIComponent(value);
    }
  });

  return result;
};

export const changeHash = (propertyChanges: any) => {
  objectToHash({
    ...hashToObject(),
    ...propertyChanges,
  });
};
