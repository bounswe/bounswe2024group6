import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios';


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().min(2).max(50),     // validation
    password: z.string().min(2).max(50),   // strong pass
  })



export default function Home() {
    const { isAuth } = useAuth()
    const [isLogin, setIsLogin] = useState<boolean>(false)


    if (isAuth) return <Navigate to="/Feed" />

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
    })
     
        // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        
        axios.post('http://127.0.0.1:8000/signup/', values)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        // ✅ This will be type-safe and validated.
        
    }

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
                            <div className="flex flex-col w-7/12 mt-2">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                        />
                                        <Button className="w-full" type="submit">Continue</Button>
                                    </form>
                                </Form>
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