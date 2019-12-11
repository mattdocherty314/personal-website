import React from 'react';

import { useDataFromBackend } from '../api'

export function Resume() {

    let unitApiResp = useDataFromBackend('/units?tags=elective,');
    let unitLoading = unitApiResp.loading;
    let unitError = unitApiResp.error;

    let experienceApiResp = useDataFromBackend('/experiences?all=true&type=it,volunteer');
    let experienceLoading = unitApiResp.loading;
    let experienceError = unitApiResp.error;

    let workApiResp = useDataFromBackend('/experiences?type=work,');
    let workLoading = unitApiResp.loading;
    let workError = unitApiResp.error;

    let awardsApiResp = useDataFromBackend('/awards');
    let awardsLoading = awardsApiResp.loading;
    let awardsError = awardsApiResp.error;

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
                    <UnitsComponent loadStatus={unitLoading} errorStatus={unitError} response={unitApiResp.response}/>
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
            <WorkComponent loadStatus={workLoading} errorStatus={workError} response={workApiResp.response}/>

            <h2> Leadership &amp; Volunteering </h2>
            <ExperienceComponent loadStatus={experienceLoading} errorStatus={experienceError} response={experienceApiResp.response}/>
            
            <h2> Certifications &amp; Awards </h2>
            <AwardComponent loadStatus={awardsLoading} errorStatus={awardsError} response={awardsApiResp.response}/>
                
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
                <td id="unit-type"><strong> Something went wrong loading the units. </strong></td>
            </tr>
        )
    }

    return (
        <tr id="units">
            <td id="unit-type"><strong> Elective Units: </strong></td>
            <td id="unit-list">{props.response.map((unit) => (
                <pre> {unit.code}:{unit.name} (GPA {unit.gpa}) </pre>
            ))}</td>
        </tr>
    )
}

function ExperienceComponent(props) {
    if (props.loadStatus) {
        return (
            <div id="experiences">
                <p><strong> Loading Experiences... </strong></p>
            </div>
        )
    }
    
    else if (props.errorStatus) {
        return (
            <div id="experiences">
                <p><strong> Something went wrong loading the experiences. </strong></p>
            </div>
        )
    }

    return (
        <div id="experiences">
            {props.response.map(experience => (
                    <div>
                        <h3>{experience.title}</h3>
                        <em>{showMonthYears(experience.times)}</em> <br/>
                        <strong> Skills Learnt </strong>
                        <p>
                            {experience.skills.map((skill) => (
                            <li>{skill}</li>
                            ))}
                        </p>
                    </div>
                ))}
        </div>
    )
}

function WorkComponent(props) {
    if (props.loadStatus) {
        return (
            <div id="work">
                <p><strong> Loading Work Experience... </strong></p>
            </div>
        )
    }
    
    else if (props.errorStatus) {
        return (
            <div id="work">
                <p><strong> Something went wrong loading the work experience. </strong></p>
            </div>
        )
    }

    return (
        <div id="work">
            {props.response.map(work => (
                    <div>
                        <h3>{work.title}</h3>
                        <em>{showMonthYears(work.times)}</em>
                        <p>
                            <strong> Skills Learnt </strong> <br/>
                            {work.skills.map((skill) => (
                            <li>{skill}</li>
                            ))}

                            <strong> Challenges Faced </strong> <br/>
                            {work.challenges.map((challenge) => (
                            <li>{challenge}</li>
                            ))}
                        </p>
                    </div>
                ))}
        </div>
    )
}

function AwardComponent(props) {
    if (props.loadStatus) {
        return (
            <div id="award">
                <p><strong> Loading Awards &amp; Certifications... </strong></p>
            </div>
        )
    }
    
    else if (props.errorStatus) {
        return (
            <div id="award">
                <p><strong> Something went wrong loading the awards &amp; certifications. </strong></p>
            </div>
        )
    }

    return (
        <div id="award">
            {props.response.map(award => (
                    <div>
                        <h3>{award.title}</h3>
                    </div>
                ))}
        </div>
    )
}

function showMonthYears(times) {
    let monthYears = "";
    times.forEach((period) => {
        if (period.start === period.end) {
            monthYears += `${convertUNIXToMonthYear(period.start)}; `; 
        } else if (period.end === -1) {
            monthYears += `${convertUNIXToMonthYear(period.start)} - ; `; 
        }
        else {
            monthYears += `${convertUNIXToMonthYear(period.start)} -
                           ${convertUNIXToMonthYear(period.end)}; `
        }
    });
    
    return monthYears;
}

function convertUNIXToMonthYear(unixTimestamp) {
    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                        "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    let month = new Date(unixTimestamp*1000).getUTCMonth();
    let year = new Date(unixTimestamp*1000).getUTCFullYear();

    return `${monthList[month]} ${year}`;
}