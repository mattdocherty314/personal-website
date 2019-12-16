import React from 'react';

import { useDataFromBackend } from '../api';

export function Projects() {
    let pageNum = getPageNumberFromURL();
    let apiResp = useDataFromBackend(`/projects?page=${pageNum}`);
    let loading = apiResp.loading;
    let error = apiResp.error;

    if (loading) {
        return (
            <div id="loading">
                <h1> Projects </h1>
                <p> Loading... </p>
            </div>
            
        )
    }

    else if (error) {
        return (
            <div id="error">
                <h1> Projects </h1>
                <p> Something went wrong... {`\n${error.toString()}`}</p>
            </div>
        )
    }

    let projectsResp = apiResp.response;
    return (
        <div id="projects">
            <h1> Projects </h1>
            <ul>
                {projectsResp.map((res) => (
                    <Project title={res.title} desc={res.desc} last_mod={res.last_modified}
                     ver={res.ver} screenshot={res.screenshot} link={res.link}
                     web={res.webpage} auth={res.authors} />
                ))}
            </ul>
            <p id="page-select">
                <button id="prev-page"> Pevious Page </button>
                <button id="next-page"> Next Page </button>
            </p>
        </div>
    )
}

function Project(props) {
    return (
        <div>
            <h2> {props.title} </h2>
            <h3> {props.desc} </h3>
            <p> Version: <em>{props.ver}</em> &emsp; Last modified: <em>{convertUNIXToDate(props.last_mod)}</em></p>
            
            <img src={props.screenshot} alt="Screenshot"/><br/>
            <p className="project-links">
                <a href={`${props.web}`}> Test Out </a> &emsp;
                <a href={`${props.link}`}> Repository </a> <br/>
            </p>
            <p> Authors: </p>
            {props.auth.map(author => (
                <p> &emsp; {author} </p>
            ))}
        </div>
    )
}

function convertUNIXToDate(unixTimestamp) {
    return new Date(unixTimestamp*1000).toDateString();
}

function getPageNumberFromURL() {
    let url = window.location.href;
    let urlDir = url.split("/");
    if (isNaN(parseInt(urlDir[urlDir.length-1]))) {
        return "1";
    } else {
        return urlDir[urlDir.length-1];
    }
}