import React from 'react';
import Chats from './Chats.js';
import getMessages from '../utils/getMessages.js';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{username: 'Dom', message: 'Hello World'}],
      liveChat: '',
      chatInput: ''
    };

  }

  componentDidMount() {
    console.log('component mounted');
    getMessages(this.updateMessages);
  }

  updateMessages(data) {
    this.setState({messages: JSON.parse(data)});
  }

  handleInput(e) {
    if(e.key === 'Enter') {
      console.log(e.target.value);

      e.target.value = '';
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h1>Connections</h1>
          </div>
          <div className="col-md-6">
            <h1>Chats</h1>
            <Chats chats={this.state.messages} />
            <div className="form-group">
              <label>Send a Message!</label>
              <textarea className="form-control" rows="2" type="text" onKeyUp={this.handleInput}></textarea>
            </div>
          </div>
          <div className="col-md-3">
            <h1>User Details</h1>
          </div>
        </div>
      </div>
    );
  }

}
// It should have a chat Component
