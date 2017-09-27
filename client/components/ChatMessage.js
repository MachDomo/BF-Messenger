import React from 'react';

const ChatMessage = (props) => {
  if (props.logged && props.user === props.chat.username) {
    return (
      <div className="chat">
        <h3 className="self">{props.chat.message}</h3>
      </div>
    );
  } else {
    return (
      <div className="chat">
        <h3>{props.chat.username}: {props.chat.message}</h3>
      </div>
    );
  }
};

ChatMessage.propTypes = {
  chat: React.PropTypes.object.isRequired,
  logged: React.PropTypes.bool.isRequired
};

export default ChatMessage;
