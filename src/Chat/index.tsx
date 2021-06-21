import React from 'react';

const Chat: React.FC = () => (
  <div>
    <h1>Luke Chat</h1>

    <dl>
      <dt>Can I order some pizza</dt>
      <dd>Sure what kind of pizza do you want?</dd>

      <dt>Pepperoni and Cheese</dt>
      <dd>Great, pepperoni and cheese coming up!</dd>
    </dl>

    <input placeholder="user input here" />
    <button>send</button>
  </div>
);

export default Chat;
