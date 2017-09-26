import React from 'react';
import Chats from './Chats.js';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: [{username: 'Dom', message: 'Hello World'}]};
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h1>Connections</h1>
          </div>
          <div className="col-md-7">
            <h1>Chats</h1>
            <Chats chats={this.state.messages} />
          </div>
          <div className="col-md-2">
            <h1>User Details</h1>
          </div>
        </div>
      </div>
    );
  }

}
// It should have a chat Component
