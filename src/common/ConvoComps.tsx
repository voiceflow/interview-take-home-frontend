import React from 'react';
import { useHistory } from 'react-router';

export const ConvoTitle: React.FC<{ title: string; subTitle: string }> = ({ title, subTitle }) => (
  <div className="justify-between sm:flex">
    <div>
      <h5 className="text-xl font-bold text-slate-900">{title}</h5>
      <p className="mt-1 text-xs font-medium text-slate-600">{subTitle}</p>
    </div>
  </div>
);

export const ConvoGoBackButton: React.FC = () => {
  const history = useHistory();

  return (
    <div className="mt-8">
      <button
        className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-pink-700 hover:bg-pink-700 text-pink-700 hover:text-white font-normal py-2 px-4 rounded"
        onClick={() => history.goBack()}
      >
        Go Back
      </button>
    </div>
  );
};

export const ConvoGreeting: React.FC<{ userID: string; messageForChat: string }> = ({ userID, messageForChat }) => (
  <div className="mt-8">
    <div className="px-4 sm:px-8 max-w-5xl m-auto">
      <h1 className="text-center font-semibold text-sm">Hello {userID}!</h1>

      <p className="mt-2 text-center text-xs mb-4 text-gray-500">{messageForChat}</p>
    </div>
  </div>
);
