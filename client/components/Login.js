import React from 'react';

const Login = (props) => {

    if (!props.logstatus) {
      return (
        <div className="login">
          <h2>Login</h2>
          <div>
            <label for="username">Username:</label>
            <input type="text" name="username" placeholder="Anonymous" value={props.user} onChange={props.handleUser} />
          </div>
          <div>
            <label for="password">Password:</label>
            <input id="password" type="password" name="password" placeholder="password" value={props.password} onChange={props.handlePassword}></input>
          </div>
          <div>
            <input type="submit" value="Login" onClick={(e) => {props.handler(e)}}/>
            <input type="submit" value="Sign Up" onClick={(e) => {props.handler(e, 'sign')}}/>
          </div>
        </div>
      );
    } else {
      return (
        <div className="login">
          <h2>User Details</h2>
          <p>You are currently logged in as:</p>
          <h4>Username: {props.user}</h4>
          <h4>Room: Lobby</h4>
          <input type="submit" value="Logout" onClick={(e) => {props.handler(e, 'logout')}}/>

        </div>


      )
    }


};

Login.propTypes = {
  handler: React.PropTypes.func.isRequired,
  user: React.PropTypes.string.isRequired,
  handleUser: React.PropTypes.func.isRequired,
  password: React.PropTypes.string.isRequired,
  handlePassword: React.PropTypes.func.isRequired,
  logstatus: React.PropTypes.bool.isRequired
};

export default Login;
