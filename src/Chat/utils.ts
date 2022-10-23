import { GeneralTrace, RequestType, TextRequest } from '@voiceflow/general-types';
import axios from 'axios';

const versionID = process.env.REACT_APP_VERSION_ID;
const chatAPIKey = process.env.REACT_APP_CHAT_API_KEY;
const talkAPIKey = process.env.REACT_APP_TALK_API_KEY;

type APIType = 'chat' | 'talk';

const getAPIKey = (type: APIType) => (type === 'chat' ? chatAPIKey : talkAPIKey);

export const interact = async (message: string, userID: string, apiType: APIType): Promise<GeneralTrace[]> => {
  const request: TextRequest = { type: RequestType.TEXT, payload: message };
  const APIKey = getAPIKey(apiType);

  const { data } = await axios.post(
    `https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}/interact`,
    { request, config: { tts: true } },
    { headers: { Authorization: APIKey } }
  );

  return data;
};

export const buttonInteract = async (request: unknown, userID: string, apiType: APIType = 'chat'): Promise<GeneralTrace[]> => {
  const APIKey = getAPIKey(apiType);
  const { data } = await axios.post(
    `https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}/interact`,
    { request, config: { tts: true } },
    { headers: { Authorization: APIKey } }
  );

  return data;
};

export const browserSupportsLocalStorage = (): boolean => {
  if (typeof Storage !== 'undefined') {
    return true;
  }

  return false;
};
