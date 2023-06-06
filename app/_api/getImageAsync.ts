export const getImageAsync = async (urlText: string) => {
  console.log({ urlText });
  const response = await fetch(urlText);
  const buf = await response.arrayBuffer();

  return new Blob([buf], { type: response.headers.get('content-type')! });
};
