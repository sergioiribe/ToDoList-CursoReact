import { useState, useEffect } from 'react'
import axios from 'axios'

export const useAPI = endpoint => {

    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        const response = await axios.get(endpoint)
        setData(response.data)
    }

  return data
}
