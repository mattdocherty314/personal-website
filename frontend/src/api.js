import { useState, useEffect } from 'react';

const apiAddress = "http://localhost:3000";

export function useDataFromBackend(path, args={}) {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDataFromBackend(path, args)
        .then((response) => {
            setResponse(response);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        })
    }, []);

    return {loading, response, error};
}

function getDataFromBackend(path, args) {
    let url = `${apiAddress}${path}`;
    let param = {
        method: "GET"
    };

    return fetch(url, param)
    .then((res) => {
        return res.json();
    });
}