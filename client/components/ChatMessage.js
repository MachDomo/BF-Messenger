import React from 'react';

const ChatMessage = (props) => (
  <div className="chat">
    <h2>{props.chat.username}: {props.chat.message}</h2>

  </div>
);

ChatMessage.propTypes = {
  chat: React.PropTypes.object.isRequired,
};

export default ChatMessage;
