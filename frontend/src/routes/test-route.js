import React from 'react';

export function Test() {
    let impl = [
        "encrypt-decrypt", "genetic-evolution", "game-of-life", "3d-render",
        "2d-shader", "day-planner"
    ];
    for (let proj = 0; proj < impl.length; proj++) {
        if (window.location.href.indexOf(impl[proj]) !== -1) {
            let iframeSource = `../test-projects/${impl[proj]}/index.html`;
            return (
                <iframe id="test" src={iframeSource}></iframe>
            )
        }
    }
    
    return (
        <p> I haven't implemented this yet. Sorry. </p>
    )
}