import { useCallback, useState } from 'react'
import fetcher from './fetcher'

const useFetch = (initialUrl, props = {}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const defaultOptions = props

    const fetchData = useCallback((options) => {
        let url = initialUrl
        if (typeof options === 'string') {
            url = options
            options = {}
        } else if (typeof options === 'object') {
            url = options.url ?? initialUrl
        }

        setLoading(true)
        fetcher(url, { ...defaultOptions, ...options })
            .then(response => response.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })
    }, [])

    return { data, loading, fetchData }
}

export default useFetch
