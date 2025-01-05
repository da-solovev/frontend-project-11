export const generateProxyUrl = (realUrl) => {
  const proxyUrl = new URL('https://allorigins.hexlet.app/get');
  proxyUrl.searchParams.set('disableCache', 'true');
  proxyUrl.searchParams.set('url', realUrl);
  return proxyUrl;
}