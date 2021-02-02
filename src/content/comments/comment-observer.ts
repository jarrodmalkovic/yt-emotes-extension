import { isComment, handleComment, isCommentThread } from './comment';
import { getDOMElement } from '../utils/get-dom-element';

const createCommentObserver = async (channelEmotes: any) => {
  const observer = new MutationObserver((mutations) =>
    onMutation(mutations, channelEmotes)
  );

  const commentsContainer = await getDOMElement(
    'ytd-comments ytd-item-section-renderer #contents.style-scope.ytd-item-section-renderer',
    document
  );

  observer.observe(commentsContainer, {
    childList: true,
    subtree: true,
  });

  return observer;
};

const onMutation = (mutations: any, channelEmotes: any) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (isComment(node.tagName)) {
        handleComment(node, channelEmotes);
      }
    }

    for (const node of mutation.removedNodes) {
      if (isCommentThread(node.tagName) || isComment(node.tagName)) {
        const span = node.querySelector('#emotesme');
        if (span) span.remove();
      }
    }
  }
};

export { createCommentObserver };
