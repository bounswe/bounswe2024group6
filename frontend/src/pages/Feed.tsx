import { Button } from '@/components/ui/button'
import { Navbar } from '../components'
import { Post } from '../components'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks'
import axios from 'axios'

import BASE_URL from '../lib/baseUrl'

export default function Feed() {
    const { checkAuth } = useAuth()
    const isAuth = checkAuth()
    const [postIDs, setPostIDs] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}:8000/guest_feed/`)
            .then(response => {
                console.log(response.data.post_ids)
                setPostIDs(response.data.post_ids)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="flex flex-row justify-center w-full pt-3">
                <div className="w-5/12">
                    {
                        postIDs.map((postID) => {
                            return (
                                <div key={postID}>
                                    <Post postID={postID} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}