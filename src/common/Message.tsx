import React from 'react';
import { buttonInteract } from 'src/Chat/utils';

import Speak from './Speak';
import { ChatType } from './utils';

export const TIME_BEFORE_CHAT_CLEARS_IN_SECONDS = 10; // seconds

export const PaperWhole: React.FC = () => <div className="h-6 w-6 rounded-full bg-gray-600 shadow-lg shadow-white absolute left-12"></div>;

const Message: React.FC<{
  chat: any;
  id: number;
  shouldSpeak: boolean;
  lastChatMessageDiv: React.RefObject<HTMLDivElement> | undefined;
  userID: string;
  chatType: ChatType;
  setLoading: (loading: boolean) => void;
  setChatLog: (chat: any) => void;
  chatLog: any;
}> = ({ lastChatMessageDiv, chat, id: index, shouldSpeak, userID, chatType, setLoading, setChatLog, chatLog }) => {
  const retypeChat = chat as any;
  const isfirstChat = index === 0;
  const userTyped = retypeChat?.from === 'user';
  const rowClassNames =
    `flex content-center ${userTyped ? 'justify-end' : 'justify-start'} pr-4 pl-32 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 ` +
    `${isfirstChat ? 'border-b-4' : 'border-b'} last:border-none border-sky-200 transition-all duration-300 ease-in-out`;

  switch (retypeChat?.type) {
    case 'text':
      return (
        <div className={rowClassNames} key={index} ref={lastChatMessageDiv}>
          {index % 11 === 2 && <PaperWhole />}
          {retypeChat?.payload?.message}
        </div>
      );
    case 'speak':
      return (
        <div key={index} className={rowClassNames} ref={lastChatMessageDiv}>
          {index % 11 === 2 && <PaperWhole />}
          <div>
            {retypeChat?.payload?.message}
            {shouldSpeak && <Speak key={index} src={retypeChat?.payload?.src} />}
          </div>
        </div>
      );
    case 'choice':
      return (
        <div className={rowClassNames} key={index} ref={lastChatMessageDiv}>
          {index % 11 === 2 && <PaperWhole />}
          {retypeChat?.payload?.buttons.map((buttonInfo: any) => (
            <button
              className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded"
              key={buttonInfo.name}
              onClick={() => {
                buttonInteract(buttonInfo.request, userID, chatType)
                  .then((response1) => {
                    setLoading(false);
                    setChatLog([
                      ...chatLog,
                      {
                        type: 'text',
                        payload: {
                          message: buttonInfo.name,
                        },
                        from: 'user',
                      },
                      ...response1,
                    ] as any);
                    return response1;
                  })
                  .catch(() => {
                    setLoading(false);
                  });
              }}
            >
              {buttonInfo.name}
            </button>
          ))}
        </div>
      );
    case 'end':
      return (
        <div
          className="flex content-center justify-around px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-sky-200 transition-all duration-300 ease-in-out"
          key={index}
          ref={lastChatMessageDiv}
        >
          {index % 11 === 2 && <PaperWhole />}
          <div>End of Convo (It'll erase the chat in {TIME_BEFORE_CHAT_CLEARS_IN_SECONDS} seconds!)</div>
        </div>
      );
    default:
      return null;
  }
};

export default Message;
