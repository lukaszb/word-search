export const BASE_URL = "/word-search";
export const getAssetUrl = (path: string) => {
  if (path.startsWith("/")) {
    path = path.substring(1);
  }
  return `${BASE_URL}/${path}`;
};

export default {
  BASE_URL,
  getAssetUrl,
};
