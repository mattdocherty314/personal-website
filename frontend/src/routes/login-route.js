import React from 'react';

export function Login() {
    return (
        <div id="login">
            <h1>Login</h1>
            <h2>Username</h2><br/>
            <input id="user"></input><br/><br/><br/><br/>
            <h2>Password</h2><br/>
            <input id="pass" type="password"></input><br/><br/><br/><br/>
            <button id="submit-login">Login</button>
			<p id="error"></p>
        </div>
    )
}