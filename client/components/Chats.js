import React from 'react';
import ChatMessage from './ChatMessage';

const Chats = (props) => (
  <div className="chats">
    {props.chats.map((chat, i) => <ChatMessage key={`chat${i}`} chat={chat} logged={props.logged} user={props.user} />)}
  </div>
);

Chats.propTypes = {
  chats: React.PropTypes.array.isRequired,
  logged: React.PropTypes.bool.isRequired,
  user: React.PropTypes.string.isRequired
};

export default Chats;
