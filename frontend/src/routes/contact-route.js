import React from 'react';

export function Contact() {
    return (
        <div id="contact">
            <h1>Contact</h1>
            <h2>Topic</h2><br/>
            <select id="topic">
				<option value="resume">R&eacute;sum&eacute; Query</option>
				<option value="lost" disabled>Found Property</option>
				<option value="employ">Employing Me?</option>
				<option value="other">Other</option>
			</select><br/><br/><br/>
            <h2>Name</h2><br/>
            <input id="name"></input><br/><br/><br/>
			<h2>Preferred Contact</h2><br/>
            <input id="pref-con"></input><br/><br/><br/>
			<h2>Query</h2>
			<textarea id="query"></textarea><br/><br/>
            <button id="submit-contact">Send Email</button>
        </div>
    )
}