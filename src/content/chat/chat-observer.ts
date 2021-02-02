import { getDOMElement } from '../utils/get-dom-element';
import {
  handleNodeChange,
  handleNodeRemoved,
  isChatMessage,
} from './chat-message';

const createChatObserver = async (channelEmotes: any) => {
  const observer = new MutationObserver((mutations) =>
    onMutation(mutations, channelEmotes, [])
  );

  const chatContainer = await getDOMElement(
    '#items.style-scope.yt-live-chat-item-list-renderer',
    document
  );

  observer.observe(chatContainer, {
    childList: true,
  });
};

const onMutation = (mutations: any, channelEmotes: any, messagesQueue: any) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (isChatMessage(node.tagName)) {
        handleNodeChange(node, channelEmotes, messagesQueue);
      }
    }

    for (const node of mutation.removedNodes) {
      if (isChatMessage(node.tagName)) {
        handleNodeRemoved(node, channelEmotes, messagesQueue);
      }
    }
  }
};

export { createChatObserver };
