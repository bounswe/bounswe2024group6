import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios';

import BASE_URL from '../lib/baseUrl'


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
import SearchIcon from '@mui/icons-material/Search';

const registerFormSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().min(2).max(50),     // validation
    password: z.string().min(2).max(50),   // strong pass
  })

const loginFormSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  })

const searchSchema = z.object({
    query: z.string().min(5).max(50),
})

export default function Home() {
    const { checkAuth, login } = useAuth()
    const isAuth = checkAuth()
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const navigate = useNavigate()
    const [query, setQuery] = useState<string>("")


    if (isAuth) return <Navigate to="/Feed" />

    const registerForm = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })
    
    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const searchForm = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            query: "",
        },
    })
     
        // 2. Define a submit handler.
    function onRegisterSubmit(values: z.infer<typeof registerFormSchema>) {
        // Do something with the form values.
        
        axios.post(`${BASE_URL}:8000/signup/`, values)
          .then(function (response) {
            registerForm.reset();
            setIsLogin(true);
          })
          .catch(function (error) {
            console.log(error);
          });
        // ✅ This will be type-safe and validated.
        
    }

    function onLoginSubmit(values: z.infer<typeof loginFormSchema>) {
        // Do something with the form values.
        
        axios.post(`${BASE_URL}:8000/login/`, values)
          .then(function (response) {
            loginForm.reset();
            login(response.data);
            navigate('/feed');
          })
          .catch(function (error) {
            console.log(error);
          });
        // ✅ This will be type-safe and validated.
        
    }

    function handleSearch(values: z.infer<typeof searchSchema>) {
        navigate(`/wiki/browse?q=${values.query}`);
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
                    <Form {...searchForm}>
                        <form onSubmit={searchForm.handleSubmit(handleSearch)} className="w-7/12 mt-3 flex flex-row gap-2">
                            <div className='w-full'>
                                <FormField
                                control={searchForm.control}
                                name="query"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <Input placeholder="Search..." {...field} className='bg-zinc-900 w-full'/>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            
                            <Button variant="outline" type='submit' className='text-zinc-900 w-10'><SearchIcon /></Button>
                        </form>
                    </Form>
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
                            <Form {...loginForm}>
                                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-2">
                                        <FormField
                                        control={loginForm.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormControl>
                                                <Input placeholder="Username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                        />
                                        <FormField
                                        control={loginForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormControl>
                                                <Input placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                        />
                                        <Button className="w-full bg-zinc-900" type="submit">Continue</Button>
                                    </form>
                                </Form>
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
                                <Form {...registerForm}>
                                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-2">
                                        <FormField
                                        control={registerForm.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormControl>
                                                <Input placeholder="Username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                        />
                                        <FormField
                                        control={registerForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormControl>
                                                <Input placeholder="example@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                        />
                                        <FormField
                                        control={registerForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormControl>
                                                <Input placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                        />
                                        <Button className="w-full bg-zinc-900" type="submit">Continue</Button>
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