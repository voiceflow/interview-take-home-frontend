import { get, set } from 'local-storage';
import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type User = string;
type Users = User[];

const USERS_LOCAL_STORAGE_KEY = 'USER';

const getUsersLocalStorage = (): Users => {
  return get(USERS_LOCAL_STORAGE_KEY) || [];
};

const setUsersLocalStorage = (users: Users) => {
  return set(USERS_LOCAL_STORAGE_KEY, users);
};

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative h-[85vh] block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6">
      {children}
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
    </div>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="my-[4%] mx-[8%]">{children}</div>;
};

const Dashboard: React.FC = () => {
  const [users, setCompUsers] = useState<Users>(getUsersLocalStorage());
  const setUsers = useCallback(
    (users: Users) => {
      setCompUsers(users);
      setUsersLocalStorage(users);
    },
    [setCompUsers]
  );

  // TODO (jimmy): handle name collisions when creating and deleting

  const textInput = useRef<HTMLInputElement>(null);

  return (
    <Layout>
      <Card>
        <div className="justify-between sm:flex">
          <div>
            <h5 className="text-xl font-bold text-slate-900">Pizza Pop Quiz™ Chat Bot</h5>
            <p className="mt-1 text-xs font-medium text-slate-600">For VoiceFlow. By Jimmy Truong.</p>
          </div>

          <div className="flex-shrink-0 hidden ml-3 sm:block">
            <img
              className="object-cover w-16 h-16 rounded-lg shadow-sm"
              // eslint-disable-next-line no-secrets/no-secrets
              src="https://securecdn.pymnts.com/wp-content/uploads/2017/10/zumepizza-768x664.jpg"
              alt=""
            />
          </div>
        </div>

        <div>
          <h6 className="text-xl font-bold text-slate-900">Frontend Interview</h6>
        </div>

        <div className="mt-4 sm:pr-8">
          <p className="text-sm text-slate-500">Create a user to chat with a bot, who will text or talk back!</p>
        </div>

        <div className="mt-8">
          <div className="px-4 sm:px-8 max-w-5xl m-auto">
            <h1 className="text-center font-semibold text-sm">Active Users</h1>
            <p className="mt-2 text-center text-xs mb-4 text-gray-500">Hop convo-to-convo</p>
            <ul className="border border-gray-200 rounded shadow-md max-h-48 overflow-scroll">
              {users.map((user) => (
                <li
                  className="flex content-center justify-around px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out"
                  key={user}
                >
                  <div className="w-32 text-emerald-700 font-bold py-2 px-4">{user}</div>
                  <Link
                    className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-sky-700 hover:bg-sky-700 text-sky-700 hover:text-white font-normal py-2 px-4 rounded"
                    to={`/chat/${user}`}
                  >
                    Chat
                  </Link>
                  <Link
                    className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white font-normal py-2 px-4 rounded"
                    to={`/talk/${user}`}
                  >
                    Talk
                  </Link>
                  <button
                    className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded"
                    type="button"
                    onClick={() => {
                      setUsers(users.filter((u) => u !== user));
                    }}
                  >
                    Delete User
                  </button>
                </li>
              ))}
              {users.length === 0 && (
                <li
                  className="flex content-center justify-around px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out pointer-events-none opacity-50"
                  key="First User"
                >
                  <div className="w-32 text-emerald-700 font-bold py-2 px-4">First User</div>
                  <Link
                    className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-sky-700 hover:bg-sky-700 text-sky-700 hover:text-white font-normal py-2 px-4 rounded"
                    to={`/chat/${'First User'}`}
                  >
                    Chat
                  </Link>
                  <Link
                    className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white font-normal py-2 px-4 rounded"
                    to={`/talk/${'First User'}`}
                  >
                    Talk
                  </Link>
                  <button
                    className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded"
                    type="button"
                  >
                    Delete User
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <div className="px-4 sm:px-8 max-w-5xl m-auto">
            <h1 className="text-center font-semibold text-sm">Create New Users</h1>
            <p className="mt-2 text-center text-xs mb-4 text-gray-500">
              Must be a unique name. <br></br>Creating a user with the same name as a deleted users will restore chat history!
            </p>
            <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const userName = textInput?.current?.value || '';

                  if (userName === '') {
                    return;
                  }

                  if (users.includes(userName)) {
                    // Do not allow duplicates
                    return;
                  }

                  setUsers([...users, userName]);

                  if (textInput.current?.value) {
                    textInput.current.value = '';
                  }
                }}
                className="m-4 flex"
              >
                <input
                  type="text"
                  className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white flex-grow"
                  placeholder="Your unique username here!"
                  ref={textInput}
                />
                <button
                  type="submit"
                  className="px-8 rounded-r-lg bg-sky-400  text-gray-800 font-bold p-4 uppercase border-sky-500 hover:bg-sky-200 border-t border-b border-r"
                >
                  Create User
                </button>
              </form>
            </ul>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Dashboard;
