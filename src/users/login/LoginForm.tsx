import React from 'react';
import { User } from '../User';

class LoginForm extends React.Component<{}, {user:User}> {
  state = {
    logedAs: '',
    user: new User(),
  };

  constructor(props: {}) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.login = this.login.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const username = form.username.value;
    const password = form.password.value;

    const user = this.login(username, password);
    this.setState({ 
      user: user,
    });
  };

  login(username: string, password: string):User {
    if (username !== '' && password !== '') {
      return new User({username: username, password: password});
    }

    return new User();
  }

  handleLogout() {
    const user = this.logout();
    this.setState({
      user: user,
    });
  }

  logout():User {
    return new User();
  }

  render() {
    let content;
    if (this.state.user.username !== '') {
      content = (
        <div className='logged-in'>
          Logged in as&nbsp;
          <span>
            <b>{this.state.user.username}</b>
          </span>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      )
    } else {
      content = (
        <form onSubmit={this.handleLogin}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" defaultValue="" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" defaultValue="" />
          <div className="input-group" >
            <button type="submit">Login</button>
          </div>
        </form>
      )
    }
    return (
      <div className="login">
        { content }
      </div>
    )
  };
};

export { LoginForm };
