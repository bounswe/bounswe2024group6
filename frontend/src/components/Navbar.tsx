import { useAuth } from '../hooks'
import { Input } from "@/components/ui/input"
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Link } from "react-router-dom";

export default function Navbar() {
    const { isAuth } = useAuth()

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
            <div className="flex justify-center w-1/4">
                <Input placeholder="Search..." className="bg-zinc-900" />
            </div>
            {
                isAuth
                ?
                    <div className="flex items-center gap-3">
                        <BookmarksOutlinedIcon />
                        <Avatar className="border-white border-2">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
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