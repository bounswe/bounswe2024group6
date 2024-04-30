import { useAuth } from '../hooks'
import { Input } from "@/components/ui/input"
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Link, useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"  
  import SearchIcon from '@mui/icons-material/Search';

export default function Navbar() {
    const { checkAuth, logout } = useAuth()
    const isAuth = checkAuth()
    const navigate = useNavigate()

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
            <div className="flex justify-center gap-2 w-1/4">
                <Input placeholder="Search..." className="bg-zinc-900" />
                <Button variant="outline" className='text-zinc-900 w-10'><SearchIcon /></Button>
            </div>
            {
                isAuth
                ?
                    <div className="flex items-center gap-3">
                        <BookmarksOutlinedIcon />
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="border-white border-2">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem><button onClick={() => {navigate("/profile");}}>Profile</button></DropdownMenuItem>
                                <DropdownMenuItem><button onClick={() => {logout(); navigate("/");}}>Logout</button></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                :
                    <div className="flex items-center gap-2">
                        <div>
                            Login
                        </div>
                        <div>
                            Register
                        </div>
                    </div>
            }
        </div>
    )
}