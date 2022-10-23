import { get, set } from 'local-storage';

export type ChatType = 'chat' | 'talk';

const setChatLogLocalStorage = (chatLog: any, userID: string) => {
  set<any>(`${userID}-chat`, chatLog);
};

const getChatLogLocalStorage = (userID: string) => {
  return get<any>(`${userID}-chat`) || [];
};

//

const setTalkLogLocalStorage = (chatLog: any, userID: string) => {
  // Note that the audio is too big for local storage
  // Thus, strip out the audio and keep convert to text so that
  // the UI works after refresh
  const chatLogNoAudio = chatLog.map((chat: any) =>
    chat?.type === 'speak'
      ? {
          ...chat,
          payload: { ...chat?.payload, src: undefined },
          type: 'text',
        }
      : chat
  );

  set<any>(`${userID}-talk`, chatLogNoAudio);
};

const getTalkLogLocalStorage = (userID: string) => {
  return get<any>(`${userID}-talk`) || [];
};
//
export const getConvoLocalStorage = (userID: string, chatType: ChatType) => {
  if (chatType === 'chat') {
    return getChatLogLocalStorage(userID);
  }

  return getTalkLogLocalStorage(userID);
};

export const setConvoLocalStorage = (chatLog: any, userID: string, chatType: ChatType) => {
  if (chatType === 'chat') {
    return setChatLogLocalStorage(chatLog, userID);
  }

  return setTalkLogLocalStorage(chatLog, userID);
};
