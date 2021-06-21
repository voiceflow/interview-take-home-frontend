import { GeneralTrace, RequestType, TextRequest } from '@voiceflow/general-types';
import axios from 'axios';

const versionID = '';
const userID = '';
const APIKey = '';

// eslint-disable-next-line import/prefer-default-export
export const interact = async (message: string): Promise<GeneralTrace[]> => {
  const request: TextRequest = { type: RequestType.TEXT, payload: message };

  const { data } = await axios.post(
    `https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}/interact`,
    { request, config: { tts: true } },
    { headers: { Authorization: APIKey } }
  );

  return data;
};
