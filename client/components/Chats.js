import React from 'react';
import ChatMessage from './ChatMessage';

const Chats = (props) => (
  <div className="chats">
    {props.chats.map((chat, i) => <ChatMessage key={'chat${i}'} chat={chat} />)}
  </div>
);

Chats.propTypes = {
  chats: React.PropTypes.array.isRequired,
};

export default Chats;
