import React, { useRef } from 'react';
import { interact } from 'src/Chat/utils';

import { ChatLogType, ChatType } from './utils';

const TextInput: React.FC<{
  setLoading: (loading: boolean) => void;
  setChatLog: (chatLog: ChatLogType) => void;
  chatLog: ChatLogType;
  userID: string;
  chatType: ChatType;
  disabled: boolean;
}> = ({ setLoading, setChatLog, chatLog, userID, chatType, disabled }) => {
  const textInput = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const message = textInput?.current?.value || '';

        interact(message, userID, chatType)
          .then((response2) => {
            setLoading(false);
            setChatLog([
              ...chatLog,
              {
                type: 'text',
                payload: {
                  message,
                },
                from: 'user',
              },
              ...response2,
            ]);

            if (textInput.current?.value) {
              textInput.current.value = '';
            }

            return response2;
          })
          .catch(() => {
            setLoading(false);
          });
      }}
    >
      <div className="flex items-center py-2 px-3 bg-sky-50 rounded-lg dark:bg-emerald-100 border-gray-200 shadow-md">
        <input
          className="block mx-4 p-2.5 w-full text-sm text-black rounded-lg border border-sky-300 focus:ring-blue-500 focus:border-blue-500 bg-white dark:border-sky-600 dark:placeholder-sky-400 dark:text-sky-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Message ..."
          ref={textInput}
          required
          disabled={disabled}
        />
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-purple-800 dark:hover:bg-sky-600"
        >
          <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default TextInput;
