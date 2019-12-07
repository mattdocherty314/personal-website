import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Projects } from './routes/projects-route';
import { Resume } from './routes/resume-route';

function App() {
    return (
        <Router>
            <div className="App">
                <aside>
                    <Link to={"/projects"}>Projects</Link>
                    <Link to={"/resume"}>Resume</Link>
                </aside>
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
        <h1> Matthew Docherty </h1>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
