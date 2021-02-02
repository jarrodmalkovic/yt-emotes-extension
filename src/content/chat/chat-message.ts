import { containsEmotes, getTextNodesAndParse } from '../emotes/emotes';

const handleNodeChange = (
  node: any,
  channelEmotes: any,
  messagesQueue: any
) => {
  const message = node.querySelector('#message');

  if (
    containsEmotes(message.textContent, channelEmotes) &&
    !message.classList.contains('emotesme')
  ) {
    getTextNodesAndParse(message, channelEmotes);
    watchChatMessage(message, channelEmotes, messagesQueue);
    const author = node.querySelector('yt-live-chat-author-chip');
    author.classList.add('emotesme');
    console.log(author);
  }
};

const handleNodeRemoved = (
  node: any,
  channelEmotes: any,
  messagesQueue: any
) => {
  const message = node.querySelector('#message');

  if (containsEmotes(message.textContent, channelEmotes)) {
    const observer = messagesQueue.shift();
    if (observer) observer.disconnect();
  }
};

const watchChatMessage = (
  message: any,
  channelEmotes: any,
  messagesQueue: any
) => {
  const chatMessageObserver = new MutationObserver((mutations) =>
    onChatMessageMutation(mutations, message, channelEmotes)
  );

  chatMessageObserver.observe(message, {
    childList: true,
  });

  messagesQueue.push(chatMessageObserver);
};

const onChatMessageMutation = (
  mutations: any,
  message: any,
  channelEmotes: any
) => {
  for (const mutation of mutations) {
    for (const node of mutation.removedNodes) {
      if (node.id === 'emotesme') {
        return getTextNodesAndParse(message, channelEmotes);
      }
    }
  }
};

const isChatMessage = (tagName: string) => {
  return tagName === 'YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER';
};

export { isChatMessage, handleNodeChange, handleNodeRemoved };
