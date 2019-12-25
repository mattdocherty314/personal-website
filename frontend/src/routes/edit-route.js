import React from 'react';

import { useDataFromBackend } from '../api'

export function Edit() {
    let postParam = {
        headers: {
            Authorization: `Bearer ${getCookie("JWT")}`
        },
        method: "POST"
    }
    let apiResp = useDataFromBackend(`/dbmeta`, null, postParam);
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

    return (
        <div id="edit">
            <h1> Edit </h1>

            <h2>Select Database</h2>
            <select id="select-db">
                <option>...</option>
                {apiResp.response.map(db => (
                    <option>{db.name}</option>
                ))}
            </select><br/><br/>

            <h2>Select Entry</h2>
            <select id="select-entry">
                <option>No Database Selected!</option>
            </select><br/><br/>
            <div id="entry-fields">
            </div>
        </div>
    )
}

function getCookie(name) {
    var name = name + "=";
    var cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}