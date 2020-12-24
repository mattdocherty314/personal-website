import React from 'react';

import { useDataFromBackend } from '../api';

export function Servers() {
    let apiResp = useDataFromBackend(`/servers`);
    let loading = apiResp.loading;
    let error = apiResp.error;

    if (loading) {
        return (
            <div id="loading">
                <h1> Servers </h1>
                <p> Loading... </p>
            </div>
            
        )
    }

    else if (error) {
        return (
            <div id="error">
                <h1> Servers </h1>
                <p> Something went wrong... {`\n${error.toString()}`}</p>
            </div>
        )
    }

    
    let serversResp = apiResp.response;
    return (
        <div id="server">
            <h1> Servers </h1>
            <ul>
                {serversResp.map((res) => (
                    <Server name={res.name} status={res.status}/>
                ))}
            </ul>
        </div>
    )
    
}

function Server(props) {
    if (props.status === "online")
        return (
            <div>
                <h2>{props.name}</h2><br/>
                <p class="online">Already Online!</p>
            </div>
        )
    else {
        return (
            <div>
                <h2>{props.name}</h2><br/>
                <button>Start {props.name} Server</button>
            </div>
        )
    }
}