import React from 'react';

export function Test() {
    let impl = ["encrypt-decrypt"];
    for (let proj = 0; proj < impl.length; proj++) {
        if (window.location.href.indexOf(impl[proj]) !== -1) {
            let iframeSource = `../test-projects/${impl[proj]}/index.html`;
            return (
                <iframe src={iframeSource}></iframe>
            )
        }
    }
    
    return (
        <p> I haven't implemented this yet. Sorry. </p>
    )
}