import { useState, useEffect } from 'react'

export default (url: string, method: string) => {
    const [data, setData] = useState({
        response: null,
        error: false,
        loading: true,
    })

    useEffect(() => {
        setData(data => ({ ...data, error: null, loading: true }))
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async response => {
                const data = await response.json()
                setData({
                    response: data,
                    error: !response.ok,
                    loading: false,
                })
            })
    }, [url, method])

    return data
}
