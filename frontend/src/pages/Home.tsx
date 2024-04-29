import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
    const { isAuth } = useAuth()
    const [isLogin, setIsLogin] = useState<boolean>(false)

    if (isAuth) return <Navigate to="/Feed" />

    return (
        <div className="flex h-screen w-screen">
            <div className="flex-1 bg-zinc-900 h-full w-full flex flex-col justify-between p-8 text-white">
                <div className="text-xl">
                    searchitect
                </div>
                <div className="flex flex-col w-full items-center gap-2">
                    <div className="text-2xl font-bold">
                        Browse as a guest
                    </div>
                    <Input placeholder="Search..." className="w-7/12 mt-3 bg-zinc-900" />
                    <div className="text-zinc-500">
                        Example: Neoclassical, Taj Mahal, Gaudí
                    </div>
                </div>
                <div className="flex flex-col">
                    <div>
                        "We shape our buildings; thereafter they shape us."
                    </div>
                    <div>
                        - Winston Churchill
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-white h-full w-full flex flex-col justify-between p-8 text-zinc-900">
                <button className="w-full text-end" onClick={() => {setIsLogin((prev) => {return !prev;})}}>
                    {isLogin ? "Register" : "Login"}
                </button>
                {
                    isLogin
                    ?
                        <div className="flex flex-col w-full items-center gap-5">
                            <div className="text-2xl font-bold">
                                Login
                            </div>
                            <div className="flex flex-col gap-2 w-7/12">
                                <Input placeholder="username" />
                                <Input placeholder="password" />
                                <Button className="w-full bg-zinc-900">
                                    Continue
                                </Button>
                            </div>
                        </div>
                    :
                        <div className="flex flex-col w-full items-center gap-4">
                            <div className="text-2xl font-bold">
                                Create an account
                            </div>
                            <div className="text-zinc-500">
                                Enter a username, email, and password to get started
                            </div>
                            <div className="flex flex-col gap-2 w-7/12 mt-2">
                                <Input placeholder="username" />
                                <Input placeholder="email" />
                                <Input placeholder="password" />
                                <Button className="w-full bg-zinc-900">
                                    Continue
                                </Button>
                            </div>
                            <div className="text-zinc-500 flex flex-col items-center">
                                <div>
                                    By clicking continue, you agree to our <u>Terms</u>
                                </div>
                                <div>
                                    <u>of Service</u> and <u>Privacy Policy</u>.
                                </div>
                            </div>
                        </div>
                }
                <div></div>
            </div>
        </div>
    )
}