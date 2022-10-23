import { GeneralTrace, RequestType, TextRequest } from '@voiceflow/general-types';
import axios from 'axios';

const versionID = 'development';
// eslint-disable-next-line no-secrets/no-secrets
const chatAPIKey = 'VF.DM.6351b3632d7a3100077aaaef.Bd2laKI1emzEzKb4';
// eslint-disable-next-line no-secrets/no-secrets
const talkAPIKey = 'VF.DM.6353861fa8fe570006712dc2.czCAgbqTVcY0cKSM';
// eslint-disable-next-line no-secrets/no-secrets
// const versionID = process.env.REACT_APP_VERSION_ID;
// const chatAPIKey = process.env.REACT_APP_CHAT_API_KEY;
// const talkAPIKey = process.env.REACT_APP_TALK_API_KEY;

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
