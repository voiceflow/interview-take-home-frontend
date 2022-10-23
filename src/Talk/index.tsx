import React from 'react';
import { ConvoGoBackButton, ConvoGreeting, ConvoTitle } from 'src/common/ConvoComps';
import Messenger from 'src/common/Messenger';
import { Card, Layout } from 'src/Dashboard';

import { browserSupportsLocalStorage } from '../Chat/utils';

const supportsLocalStorage = browserSupportsLocalStorage();

const Talk: React.FC<{ userID: string }> = ({ userID }) => {
  const messageForChat = !supportsLocalStorage
    ? 'Your browser does not support local storage or does not have it turned on. Refreshes will lose chat!'
    : 'Respond by typing the keyword';

  return (
    <Layout>
      <Card>
        <ConvoTitle title="Voiceflow Pizza Pop Quiz™ Talk Bot" subTitle="Pizza Pop Quiz™ Bot will take your order" />
        <ConvoGoBackButton />
        <ConvoGreeting userID={userID} messageForChat={messageForChat} />
        <Messenger userID={userID} chatType="talk" />
      </Card>
    </Layout>
  );
};

export default Talk;
