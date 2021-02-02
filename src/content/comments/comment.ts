import { containsEmotes, getTextNodesAndParse } from '../emotes/emotes';

const handleComment = (node: any, channelEmotes: any) => {
  const content = node.querySelector('#content-text');

  if (containsEmotes(content.textContent, channelEmotes))
    getTextNodesAndParse(content, channelEmotes);
};

const isComment = (tagName: string) => {
  return tagName === 'YTD-COMMENT-RENDERER';
};

const isCommentThread = (tagName: string) => {
  return tagName === 'YTD-COMMENT-THREAD-RENDERER';
};

export { isComment, handleComment, isCommentThread };
