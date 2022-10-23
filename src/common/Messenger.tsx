import React, { useCallback, useEffect, useRef, useState } from 'react';
import { interact } from 'src/Chat/utils';

import Message, { TIME_BEFORE_CHAT_CLEARS_IN_SECONDS } from './Message';
import TextInput from './TextInput';
import { ChatLogType, ChatType, getConvoLocalStorage, setConvoLocalStorage, VoiceflowChatType } from './utils';

const Messenger: React.FC<{
  userID: string;
  chatType: ChatType;
}> = ({ userID, chatType }) => {
  const [chatLog, setCompChatLog] = useState<VoiceflowChatType[]>(getConvoLocalStorage(userID, chatType));
  const lastSpeakIndex = chatLog.length - 1 - [...chatLog].reverse().findIndex((chat) => chat?.type === 'speak');
  const lastChatMessageDiv = useRef<HTMLDivElement>(null);

  const [focusLastChat, setFocusLastChat] = useState(false);

  const focusLastChatDiv = () => {
    if (!lastChatMessageDiv?.current) {
      return;
    }

    lastChatMessageDiv.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setFocusLastChat(false);
  };

  useEffect(() => {
    focusLastChatDiv();
  }, []);

  useEffect(() => {
    if (!focusLastChat) {
      return;
    }

    focusLastChatDiv();
  }, [focusLastChat]);

  const setChatLog = useCallback(
    (chatLog: ChatLogType) => {
      setCompChatLog(chatLog);
      setConvoLocalStorage(chatLog, userID, chatType);
      setFocusLastChat(true);
    },
    [setCompChatLog]
  );

  const [loading, setLoading] = useState(false);

  const [chatFinished, setChatFinished] = useState(false);

  const startConvo = () => {
    setLoading(true);

    interact(
      '', // First message to start the convo is empty string
      userID,
      chatType
    )
      .then((response) => {
        setLoading(false);
        setChatLog([...chatLog, ...response]);
        return response;
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (chatLog.length > 0) {
      return;
    }

    startConvo();
  }, []);

  useEffect(() => {
    if (chatFinished) {
      setTimeout(() => {
        setChatLog([
          {
            type: 'text',
            payload: {
              message: 'Say something to start another convo',
            },
            from: 'app',
          },
        ]);
        setChatFinished(false);
      }, TIME_BEFORE_CHAT_CLEARS_IN_SECONDS * 1000);
    }
  }, [chatFinished]);

  useEffect(() => {
    if (chatLog.find((chat) => chat?.type === 'end')) {
      setChatFinished(true);
    }
  }, [chatLog]);

  return (
    <div className="flex flex-col gap-8">
      <dl>
        <div className="border border-gray-200 rounded shadow-md overflow-scroll h-64 relative">
          <div className="w-24 border-r border-red-700 fixed h-64 flex justify-center"></div>
          <div className="h-24"></div>
          <div className="flex flex-row">
            <div
              className="flex-grow"
              style={{
                fontFamily: 'Gloria Hallelujah, cursive',
              }}
            >
              {chatLog.map((chat, index: number) => {
                const isLastTalkMessage = lastSpeakIndex === index;
                const isLastChatMessage = chatLog.length - 1 === index;

                return (
                  <Message
                    key={index}
                    chat={chat}
                    id={index}
                    shouldSpeak={isLastTalkMessage}
                    lastChatMessageDiv={isLastChatMessage ? lastChatMessageDiv : undefined}
                    userID={userID}
                    chatType={chatType}
                    setLoading={setLoading}
                    setChatLog={setChatLog}
                    chatLog={chatLog}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {loading && <span>"..."</span>}
      </dl>

      <TextInput setLoading={setLoading} setChatLog={setChatLog} chatLog={chatLog} userID={userID} chatType={chatType} disabled={loading} />
    </div>
  );
};

export default Messenger;
