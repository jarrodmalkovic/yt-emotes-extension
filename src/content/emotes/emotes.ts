const getChannelEmotes = async (channelId: string) => {
  // Just some fake data for now
  const emotes: any = [
    {
      emoteName: 'TriDance',
      imgUrl:
        'https://res.cloudinary.com/dxzqdsjok/image/upload/h_28,w_28/v1611753305/xeu82njprqgvvf3n3von.png',
    },

    {
      emoteName: 'Pepega',
      imgUrl:
        'https://res.cloudinary.com/dxzqdsjok/image/upload/h_28,w_28/v1611753305/xeu82njprqgvvf3n3von.png',
    },
    {
      emoteName: 'Clap',
      imgUrl:
        'https://res.cloudinary.com/dxzqdsjok/image/upload/h_28,w_28/v1611753305/xeu82njprqgvvf3n3von.png',
    },
  ];

  const emotesHtml: any = {};

  for (const emote of emotes) {
    emotesHtml[
      emote.emoteName
    ] = `<span class="tooltip"><span class="tooltiptext">${emote.emoteName}</span><img class="emote" src="${emote.imgUrl}" alt="${emote.emoteName}"></img></span>`;
  }

  return emotesHtml;
};

const getTextNodesAndParse = (node: any, channelEmotes: any) => {
  const ELEMENT_NODE = 1,
    TEXT_NODE = 3;
  let next;

  if (node.nodeType === ELEMENT_NODE) {
    if ((node = node.firstChild)) {
      do {
        next = node.nextSibling;
        getTextNodesAndParse(node, channelEmotes);
      } while ((node = next));
    }
  } else if (node.nodeType === TEXT_NODE) {
    const emoteTextNode = parseTextNodes(node, channelEmotes);
    node.replaceWith(emoteTextNode);
  }
};

const parseTextNodes = (node: any, channelEmotes: any) => {
  const span = document.createElement('span');
  const words = node.data.split(' ');
  span.id = 'emotesme';

  for (let i = 0; i < words.length; i++) {
    if (channelEmotes[words[i]]) {
      words[i] = channelEmotes[words[i]];
    }
  }

  span.innerHTML = words.join(' ');
  return span;
};

const containsEmotes = (text: string, channelEmotes: any) => {
  const words = text.split(' ');

  return words.some((word) => channelEmotes.hasOwnProperty(word));
};

export { containsEmotes, getChannelEmotes, getTextNodesAndParse };
