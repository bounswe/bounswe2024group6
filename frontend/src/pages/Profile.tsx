import { Navbar } from '../components'

import { useAuth } from '../hooks'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

import shadcnProfile from './shadcnProfile.jpeg';


export default function Profile() {
    const { checkAuth, getUsername, getToken } = useAuth()
    const isAuth = checkAuth()
    const authUsername = getUsername()
    const token = getToken()

    const mockName = "Emre Özdemir"
    const mockBio = "Architecture Enthusiast, Computer Engineering Student at Boğaziçi University"

    let { username } = useParams();

    const visitType = isAuth ? (username === authUsername ? "own" : "other") : "guest"

    const [profile, setProfile] = useState({})

    useEffect(() => {
        axios.post(`http://localhost:8000/user_profile/`,
        { username: username },
        )
        .then((response) => {
            console.log(response.data)
            setProfile(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <div>
            <Navbar />
                <div className="flex flex-row justify-center pt-5">
                    <div className="flex flex-row p-2 rounded-md shadow-sm border w-5/12">
                        <div className="flex-initial">
                            <img src={profile.profileImage ? profile.profileImage : shadcnProfile} alt="Profile Image" style={{ width: "10rem", height: "10rem", objectFit: 'cover', borderRadius: '0.375rem'}}/>
                        </div>
                        <div className="flex-auto flex flex-col p-2">
                            <h1 className="font-bold text-2xl">{mockName}</h1>
                            <h1 className="font-bold text-2xl">{"@" + profile.username}</h1>
                            <p className="text-large flex-wrap">{mockBio}</p>
                            {
                                visitType === "own"
                                ?
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Edit Profile
                                    </button>
                                :
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Follow
                                    </button>
                            }
                        </div>
                    </div>
                </div>
        </div>
    )
}