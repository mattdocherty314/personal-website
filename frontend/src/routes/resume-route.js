import React from 'react';

import { useDataFromBackend } from '../api'

export function Resume() {

    let apiResp = useDataFromBackend('/units?tags=elective,');
    let loading = apiResp.loading;
    let error = apiResp.error;

    return (
        <div id="resume">
            <h1> Resume </h1>
            
            <h2> Education </h2>
            <p>
                <strong> Bachelor of Engineering (Honours) / Information Technology </strong><br/>
                <em> Queensland University of Technology </em> <br/>
                Jan 2018 - Est. Nov 2022 <br/>
                <table>
                <tr>
                        <td><strong> Current GPA: </strong></td>
                        <td> 5.625 </td>
                    </tr>
                    <tr>
                        <td><strong> Engineering (Honours) Major: </strong></td>
                        <td> Computer and Software Systems </td>
                    </tr>
                    <tr>
                        <td><strong> Information Technology Major:</strong></td>
                        <td> Computer Science </td>
                    </tr>
                    <UnitsComponent loadStatus={loading} errorStatus={error} response={apiResp.response}/>
                    <strong><p> Type of Unit: </p></strong>
                    <select id="show-unit">
                        <option value="elective"> Elective Units </option>
                        <option value="core"> Core Units </option>
                        <option value="it"> I.T. Units</option>
                        <option value="security"> Security Units </option>
                        <option value="engineering"> Engineering Units </option>
                        <option value="maths"> Mathematics Units </option>
                    </select>
                </table>
            </p>

            <h2> Experience </h2>
            <p>
                <strong> School IT Technician </strong> <br/>
                <em> Mansfield State High School </em> <br/>
                Feb 2018 - Apr 2018, Dec 2018 - Oct 2019 <br/>
                As a school IT technician, I and other senior technicians were
                responsible for resolving issues relating to the school computers,
                laptops and related techologies. For example, if a projector wasn't
                connecting to a teacher computer, I had to diagnose whether it
                was the cable or if the computer wasn't configured for the
                projector. <br/>
                The primary thing that I learnt from the job was that I don't
                have to always know the answer to problems. I also learn't how
                to effectively communicate the problem to co-workers so that they
                can suggest solutions that weren't attempted. <br/>
                <table>
                    <tr>
                        <td> <strong> Reference: </strong> </td>
                        <td> Ben Agnew, Senior School IT Technician </td>
                        <td> *@*.* </td>
                        <td> #* </td>
                    </tr>
                </table> 
            </p>

            <h2> Skills &amp; Qualities </h2>
            <ul>
                <li> Problem Solver / Logical Thinker </li>
                <li> Hard &amp; Determined Thinker </li>
                <li> Team Player </li>
                <li> IT &amp; Programming Skills </li>
            </ul>

            <h2> Activities </h2>
            <p>
                <stong> Leadership &amp; Volunteering </stong>
                <ul>
                    <li> SU QLD Youth Leadership </li>
                    <li> QUT Student COnnect Leader </li>
                    <li> CoderDojo Mentor Volunteer </li>
                    <li> Gateway Baptist Coffee Shop Volunteer </li>
                </ul>

                <strong> Certifications &amp; Awards </strong>
                <table>
                    <tr>
                        <td> GovHack 2017: </td>
                        <td> <em> Honourable Mention Award </em> </td>
                    </tr>
                    <tr>
                        <td> QUT Sem 1 2018: </td>
                        <td> <em> Dean's Honour Award </em> </td>
                    </tr>
                </table>
            </p>
        </div>
    )
}

function UnitsComponent(props) {
    if (props.loadStatus) {
        return (
            <tr id="units">
                <td id="unit-type"><strong> Loading Units... </strong></td>
            </tr>
        )
    }
    
    else if (props.errorStatus) {
        return (
            <tr id="units">
                <td id="unit-type"><strong> Something went wrong loading Units. </strong></td>
            </tr>
        )
    }
    console.log(props)
    return (
        <tr id="units">
            <td id="unit-type"><strong> Elective Units: </strong></td>
            <td id="unit-list">{props.response.map((unit) => (
                <pre> {unit.code}:{unit.name} (GPA {unit.gpa}) </pre>
            ))}</td>
        </tr>
    )
}