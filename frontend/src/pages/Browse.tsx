import { useEffect, useState } from 'react'
import { Navbar } from '../components'
import { useSearchParams } from "react-router-dom";

import { useAuth } from '../hooks'
import axios from 'axios';

const BASE_URL = ""

export default function Browse() {
    const { checkAuth } = useAuth()
    const isAuth = checkAuth()

    const [isLoading, setIsLoading] = useState(true)
    const [searchResults, setSearchResults] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        axios.post(`${BASE_URL}:8000/search/`, {query: searchParams.get("q")})
          .then(function (response) {
            console.log(response);
            setIsLoading(false)
          })
          .catch(function (error) {
            console.log(error);
            setIsLoading(false)
          });
    }, [setSearchResults])

    return (
        <div>
            <Navbar />
            {
                isLoading
                ?
                    <h1>Loading</h1>
                :
                    <h1>{searchParams.get("q")}</h1>
            }
        </div>
    )
}