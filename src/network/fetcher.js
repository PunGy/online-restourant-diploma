const fetcher = (url, options) => fetch(process.env.REACT_APP_API_URL + url, options)

export default fetcher