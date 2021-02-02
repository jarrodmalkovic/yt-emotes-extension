import { getDOMElement } from './get-dom-element';

const getChannelId = async (document: Document): Promise<string> => {
  const channelIdDiv = await getDOMElement(
    '.yt-simple-endpoint.style-scope.yt-formatted-string',
    document
  );

  const channelId = channelIdDiv.getAttribute('href').split('/')[2];

  return channelId;
};

export { getChannelId };
