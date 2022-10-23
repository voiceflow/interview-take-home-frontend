import { GeneralTrace } from '@voiceflow/general-types';
import { get, set } from 'local-storage';

export type ChatType = 'chat' | 'talk';
export type VoiceflowChatType = GeneralTrace | { type: 'text'; payload: { message: string }; from: string };
export type ChatLogType = VoiceflowChatType[];

const setChatLogLocalStorage = (chatLog: ChatLogType, userID: string) => {
  set<ChatLogType>(`${userID}-chat`, chatLog);
};

const getChatLogLocalStorage = (userID: string) => {
  return get<ChatLogType>(`${userID}-chat`) || [];
};

//

const setTalkLogLocalStorage = (chatLog: ChatLogType, userID: string) => {
  // Note that the audio is too big for local storage
  // Thus, strip out the audio and keep convert to text so that
  // the UI works after refresh
  const chatLogNoAudio = chatLog.map((chat) =>
    chat?.type === 'speak'
      ? {
          ...chat,
          payload: { ...chat?.payload, src: undefined },
          type: 'text',
        }
      : chat
  );

  set<ChatLogType>(`${userID}-talk`, chatLogNoAudio as ChatLogType);
};

const getTalkLogLocalStorage = (userID: string) => {
  return get<ChatLogType>(`${userID}-talk`) || [];
};
//
export const getConvoLocalStorage = (userID: string, chatType: ChatType): ChatLogType => {
  if (chatType === 'chat') {
    return getChatLogLocalStorage(userID);
  }

  return getTalkLogLocalStorage(userID);
};

export const setConvoLocalStorage = (chatLog: ChatLogType, userID: string, chatType: ChatType): void => {
  if (chatType === 'chat') {
    return setChatLogLocalStorage(chatLog, userID);
  }

  return setTalkLogLocalStorage(chatLog, userID);
};
