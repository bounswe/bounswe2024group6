import { useEffect, useState } from 'react'
import { Navbar } from '../components'
import { SearchItem } from '../components'
import { useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import { useAuth } from '../hooks'
import axios from 'axios';

import BASE_URL from '../lib/baseUrl'

export default function Browse() {
    const { checkAuth } = useAuth()
    const isAuth = checkAuth()

    const [isLoading, setIsLoading] = useState(true)
    const [searchResults, setSearchResults] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        axios.post(`${BASE_URL}:8000/search/`, {query: searchParams.get("q")})
          .then(function (response) {
            if (response.hasOwnProperty("data")) {
                const tempResults: any[] = []
                if (response.data.hasOwnProperty("style") && response.data.style && response.data.style.length > 0) {
                    tempResults.push(response.data.style.map((item) => { return {...item, category: "style"} }))
                }
                if (response.data.hasOwnProperty("architect") && response.data.architect && response.data.architect.length > 0) {
                    tempResults.push(response.data.architect.map((item) => { return {...item, category: "architect"} }))
                }
                if (response.data.hasOwnProperty("building") && response.data.building && response.data.building.length > 0) {
                    tempResults.push(response.data.building.map((item) => { return {...item, category: "building"} }))
                }
                setSearchResults((prev) => { return tempResults; })
                console.log(tempResults)
            }
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
                    <div className="flex w-full justify-center">
                        <div className="mt-20">
                            <ClipLoader
                                color={"#000000"}
                                loading={isLoading}
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    </div>
                :
                    <div className="flex w-full justify-center mt-3">
                        <div className="flex flex-col items-center w-7/12 gap-3">
                            {searchResults[0].map((result) => {
                                return <SearchItem item={result} key={result["Entity ID"]}/>
                                })}
                        </div>
                    </div>
            }
        </div>
    )
}