import { useState, useEffect } from 'react';

const apiAddress = "http://localhost:3030";

export function useDataFromBackend(path, args={}, param={method: "GET"}) {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDataFromBackend(path, args, param)
        .then((response) => {
			if (response.error !== undefined) {
				throw response.error;
			}
            setResponse(response.results);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        })
    }, []);

    return {loading, response, error};
}

function getDataFromBackend(path, args, param) {
    let url = `${apiAddress}${path}`;

    return fetch(url, param)
    .then((res) => {
        return res.json();
    });
}