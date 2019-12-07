import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Projects } from './routes/projects-route';
import { Resume } from './routes/resume-route';
import './index.css'

function App() {
    return (
        <Router>
            <div className="App">
                <aside><ul id="nav">
                    <Link to={"/"}><li>Home</li></Link>
                    <Link to={"/projects"}><li>Projects</li></Link>
                    <Link to={"/resume"}><li>Resume</li></Link>
                    </ul></aside>
                <main>
                    <Route exact path="/" component={Menu} />
                    <Route exact path="/projects" component={Projects} />
                    <Route path="/resume" component={Resume} />
                </main>
            </div>
        </Router>
    )
}

function Menu() {
    return (
        <div id="main">
            <h1 id="main-title"> Matthew Docherty </h1>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
