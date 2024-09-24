import { Navbar } from '../components'
import { Post } from '../components'

import { useAuth } from '../hooks'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import shadcnProfile from './shadcnProfile.jpeg';

import BASE_URL from '../lib/baseUrl'

export default function Profile() {
    const { checkAuth, getUsername, getToken, setProfileImage } = useAuth()
    const isAuth = checkAuth()
    const authUsername = getUsername()
    const token = getToken()

    let { username } = useParams();

    const visitType = isAuth ? (username === authUsername ? "own" : "other") : "guest"

    const [profile, setProfile] = useState({})

    const [updateName, setUpdateName] = useState("")
    const [updateBio, setUpdateBio] = useState("")
    const [updateImage, setUpdateImage] = useState("")

    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        if (isAuth) {
            axios.post(`${BASE_URL}:8000/auth_user_profile/`,
            { username: username },
            { headers: { Authorization: `Token ${token}` } }
            )
            .then((response) => {
                console.log(response.data)
                setProfile(response.data)
                setUpdateName(response.data.name)
                setUpdateImage(response.data.profile_image)
                setUpdateBio(response.data.bio)
                setIsFollowing(response.data.is_following)
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            axios.post(`${BASE_URL}:8000/user_profile/`,
            { username: username },
            )
            .then((response) => {
                console.log(response.data)
                setProfile(response.data)
                setUpdateName(response.data.name)
                setUpdateImage(response.data.profile_image)
                setUpdateBio(response.data.bio)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [])
    return (
        <div>
            <Navbar />
                <div className="flex flex-row justify-center pt-5">
                    <div className="flex flex-row p-2 rounded-md shadow-sm border w-5/12 gap-2">
                        <div className="flex-initial">
                            <img src={profile.profile_image ? profile.profile_image : shadcnProfile} alt="Profile Image" style={{ width: "8rem", height: "8rem", objectFit: 'cover', borderRadius: '0.375rem'}}/>
                        </div>
                        <div className="flex-auto flex flex-col px-2 justify-between h-full">
                            <div className="flex flex-col pt-2">
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-2xl">{profile.name}</h1>
                                        <h1 className="font-bold text-xl text-zinc-600">{"@" + profile.username}</h1>
                                    </div>
                                    <div>
                                        {
                                            visitType === "own"
                                            ?
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                    <Button variant="outline">Edit Profile</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit profile</DialogTitle>
                                                        <DialogDescription>
                                                        Make changes to your profile here. Click save when you're done.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="name" className="text-right">
                                                                Name
                                                            </Label>
                                                            <Input
                                                                id="name"
                                                                defaultValue={updateName}
                                                                className="col-span-3"
                                                                onChange={(e) => setUpdateName(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="imageURL" className="text-right">
                                                                Image URL
                                                            </Label>
                                                            <Input
                                                                id="imageURL"
                                                                defaultValue={updateImage}
                                                                className="col-span-3"
                                                                onChange={(e) => setUpdateImage(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="imageURL" className="text-right">
                                                                Bio
                                                            </Label>
                                                            <Textarea
                                                                id="bio"    
                                                                defaultValue={updateBio}
                                                                className="col-span-3"
                                                                onChange={(e) => setUpdateBio(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button onClick={() => {
                                                            axios.post(`${BASE_URL}:8000/update_user_profile/`,
                                                                { name: updateName, profile_image: updateImage, bio: updateBio },
                                                                { headers: { Authorization: `Token ${token}` } }
                                                            )
                                                            .then((response) => {
                                                                console.log(response.data)
                                                                setProfile(response.data)
                                                                setProfileImage(response.data.profile_image)
                                                            })
                                                            .catch((error) => {
                                                                console.log(error)
                                                            })
                                                        }}>Save changes</Button>
                                                    </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            :
                                                visitType === "other"
                                                ?
                                                (
                                                    isFollowing
                                                    ?
                                                        <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                                                                axios.post(`${BASE_URL}:8000/unfollow/`,
                                                                    { username: profile.username },
                                                                    { headers: { Authorization: `Token ${token}` } }
                                                                )
                                                                .then((response) => {
                                                                    console.log(response.data)
                                                                    setIsFollowing(false)
                                                                })
                                                                .catch((error) => {
                                                                    console.log(error)
                                                                })
                                                            }
                                                        }>
                                                            Unfollow
                                                        </Button>
                                                    :
                                                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                                                                axios.post(`${BASE_URL}:8000/follow/`,
                                                                    { username: profile.username },
                                                                    { headers: { Authorization: `Token ${token}` } }
                                                                )
                                                                .then((response) => {
                                                                    console.log(response.data)
                                                                    setIsFollowing(true)
                                                                })
                                                                .catch((error) => {
                                                                    console.log(error)
                                                                })
                                                            }
                                                        }>
                                                            Follow
                                                        </Button>
                                                )
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <p className="text-large text-sm flex-wrap">{profile.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
