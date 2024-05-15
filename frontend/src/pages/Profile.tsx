import { Navbar } from '../components'

import { useAuth } from '../hooks'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'


export default function Profile() {
    const { checkAuth, getUsername, getToken } = useAuth()
    const isAuth = checkAuth()
    const authUsername = getUsername()
    const token = getToken()

    let { username } = useParams();

    const [profile, setProfile] = useState({})

    const mockProfile = {
        username: "oktayozel",
        description: "Architecture Enthusiast, Computer Engineering Student @BoğaziçiUniversity",
        profileImage: "https://private-user-images.githubusercontent.com/57640531/310137517-cbe7aa9f-3457-4f64-b37b-c3e46d4e448b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTU3ODUwOTYsIm5iZiI6MTcxNTc4NDc5NiwicGF0aCI6Ii81NzY0MDUzMS8zMTAxMzc1MTctY2JlN2FhOWYtMzQ1Ny00ZjY0LWIzN2ItYzNlNDZkNGU0NDhiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTE1VDE0NTMxNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE3N2Q2Njg1ZTlkYmE3OTkwNzBjYjdlYzM2ZGJiMjA4N2EyNTIxZmNhMGRmYzE5NTdlOGE4YWY2MzhlMDdiNmMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Fu2t4osvCKK1l6AEwjfuHdCULHqeZvmegV5ELEhRNeY",
        backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1200px-Colosseo_2020.jpg",
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/user_profile/`,
        {
            headers: {
                "Authorization": `Token ${token}`
            }
        }
        )
        .then((response) => {
            console.log(response.data)
            setProfile(mockProfile)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <div>
            <Navbar />
            {
                isAuth
                ?
                    <div>
                        <h1>{profile.username}</h1>
                        <h1>{profile.description}</h1>
                        <img src={profile.profileImage} alt="profile image" />
                        <img src={profile.backgroundImage} alt="background image" />
                    </div>
                :
                    <h1>Guest User Profile</h1>
            }
        </div>
    )
}