import React from 'react';
import Chats from './Chats.js';
import Login from './Login.js';
import getMessages from '../utils/getMessages.js';
import postMessages from '../utils/postMessages.js';
import loginRequest from '../utils/loginrequest.js';




export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      liveChat: '',
      chatInput: '',
      currentUser: 'Anon',
      userInput: '',
      passwordInput: '',
      isLoggedIn: false

    };

    this.updateMessages = this.updateMessages.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

  }

  componentDidMount() {
    console.log('component mounted');

    this.getMessages();
    setInterval(() => {
      this.getMessages()
    }, 5000);
  }

  getMessages() {
    getMessages(this.updateMessages);
  }


  updateMessages(data) {
    if (this.state.messages.length !== data.length) {
      this.setState({messages: data});
      this.scrollToBottom();
    }
  }


 
  handleInput(e) {
    if(e.key === 'Enter') {
      console.log(e.target.value, this);
      let message = {
        username: this.state.currentUser,
        message: e.target.value
      };
      postMessages(message, this.getMessages);
      e.target.value = '';
    }
  }

  handleUser(e) {

    this.setState({userInput: e.target.value});
  }

  handlePassword(e) {
    this.setState({passwordInput: e.target.value});
  }

  handleLogin(e, type) {
    let credentials = {
      username: this.state.userInput,
      password: this.state.passwordInput
    };
    let endpoint = '/login';
    if (type === 'sign') {
      endpoint = '/signup';
    }

    loginRequest(credentials, endpoint, (res) => {

      if (res.InvalidSubmission) {
        this.setState({userInput: 'Invalid Username or Password', password: ''});
      } else {
        this.setState({currentUser: res.username});
        this.setState({isLoggedIn: !this.state.isLoggedIn});
        if(!this.state.isLoggedIn) {
          this.setState({currentUser: 'Anon'});
        }

      }
    });
  }

  scrollToBottom() {

    this.bottom.scrollIntoView({behavior: "smooth"});
  }

  render() {
    return (
      <div>
        <div className="container">
        <div className="navbar">
        </div>
          <div className="row">
            <div className="col-md-3">
            </div>
            <div className="col-md-6">
              <h1>React Chat</h1>
              <div className="scroll">
                <Chats chats={this.state.messages} logged={this.state.isLoggedIn} user={this.state.currentUser} />
                <div ref={(el) => { this.bottom = el; }} />
              </div>
              <div className="form-group">
                <label>Send a Message!</label>
                <textarea className="form-control" rows="2" type="text" onKeyUp={this.handleInput}></textarea>
              </div>
            </div>
            <div className="col-md-3">
              <Login logstatus={this.state.isLoggedIn} handler={this.handleLogin} user={this.state.userInput} handleUser={this.handleUser} password={this.state.passwordInput} handlePassword={this.handlePassword} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}
