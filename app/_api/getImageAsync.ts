export const getImageAsync = async (urlText: string) => {
  const apiUrl = new URL(location.origin);
  apiUrl.pathname = '/api/image';
  apiUrl.searchParams.set('url', urlText);

  const response = await fetch(apiUrl.toString());
  return await response.blob();
};
