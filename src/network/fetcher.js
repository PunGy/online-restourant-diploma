const fetcher = (url, options = {}) => {
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }
    return fetch(process.env.REACT_APP_API_URL + url, { ...defaultOptions, ...options })
}

export default fetcher