import { useCallback, useState } from 'react'
import fetcher from './fetcher'

const useFetch = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchData = useCallback((url, options) => {
        setLoading(true)
        fetcher(url, options)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })
    }, [])

    return { data, loading, fetchData }
}

export default useFetch
