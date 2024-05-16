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
                    <div className="flex flex-row p-2 rounded-md shadow-sm border w-5/12 gap-2">
                        <div className="flex-initial">
                            <img src={profile.profileImage ? profile.profileImage : shadcnProfile} alt="Profile Image" style={{ width: "8rem", height: "8rem", objectFit: 'cover', borderRadius: '0.375rem'}}/>
                        </div>
                        <div className="flex-auto flex flex-col px-2 justify-between h-full">
                            <div className="flex flex-col pt-2">
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-2xl">{mockName}</h1>
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
                                                                defaultValue="Pedro Duarte"
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="imageURL" className="text-right">
                                                                Image URL
                                                            </Label>
                                                            <Input
                                                                id="imageURL"
                                                                defaultValue="@peduarte"
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="imageURL" className="text-right">
                                                                Bio
                                                            </Label>
                                                            <Textarea
                                                                id="bio"    
                                                                defaultValue="I'm a designer and developer from Portugal."
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit">Save changes</Button>
                                                    </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            :
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Follow
                                                </button>
                                        }
                                    </div>
                                </div>
                                <p className="text-large text-sm flex-wrap">{mockBio}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
