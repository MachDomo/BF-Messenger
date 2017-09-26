import React from 'react';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: [{username: 'Dom', message: 'Hello World'}]};
  }
  render ()  {
    return (
      <div>
        <div className="row"></div>


      <h1>Hello from react {this.state.messages[0].username}</h1>
      </div>

    );
  }

}
// It should have a chat Component
