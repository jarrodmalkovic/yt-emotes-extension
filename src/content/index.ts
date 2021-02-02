import { getChannelId } from './utils/get-channel-id';
import { createCommentObserver } from './comments/comment-observer';
import { getChannelEmotes } from './emotes/emotes';
import { createChatObserver } from './chat/chat-observer';

(async () => {
  if (document.location.pathname === '/live_chat') {
    const channelId = await getChannelId(parent.document);
    const channelEmotes = await getChannelEmotes(channelId);
    await createChatObserver(channelEmotes);
  } else {
    const channelId = await getChannelId(document);
    const channelEmotes = await getChannelEmotes(channelId);
    await createCommentObserver(channelEmotes);
  }
})();
