import { useAuth } from '../hooks'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import { useForm } from "react-hook-form"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import shadcnProfile from '@/pages/shadcnProfile.jpeg';

const searchSchema = z.object({
    query: z.string().min(5).max(50),
  })


export default function Navbar() {
    const { checkAuth, logout, getUsername, getProfileImage } = useAuth()
    const isAuth = checkAuth()
    const authUsername = getUsername()
    const profileImage = getProfileImage()
    const navigate = useNavigate()
    const [query, setQuery] = useState<string>("")

    const searchForm = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            query: "",
        },
    })

    function handleSearch(values: z.infer<typeof searchSchema>) {
        navigate(`/wiki/browse?q=${values.query}`);
        navigate(0);
    }

    return (
        <div className="flex bg-zinc-900 text-white w-full items-center justify-between py-3 px-6">
            <div className="flex items-center gap-3">
                <div className="text-xl">
                    searchitect
                </div>
                <div className="h-7 w-0.5 bg-white"></div>
                <Link to="/feed">
                    Feed
                </Link>
            </div>
            <Form {...searchForm}>
                <form onSubmit={searchForm.handleSubmit(handleSearch)} className="w-1/4 flex flex-row gap-2 justify-center">
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
            {
                isAuth
                ?
                    <div className="flex items-center gap-3">
                        <BookmarksOutlinedIcon />
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="border-white border-2">
                                    <AvatarImage src={profileImage ? profileImage : shadcnProfile}  alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => {navigate(`/profile/${authUsername}`); navigate(0);}}>Profile</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {logout(); navigate("/");}}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                :
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            Login
                        </Link>
                        <Link to="/">
                            Register
                        </Link>
                    </div>
            }
        </div>
    )
}