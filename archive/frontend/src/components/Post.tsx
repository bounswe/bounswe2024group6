import { Separator } from "@/components/ui/separator"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';   // before like
import FavoriteIcon from '@mui/icons-material/Favorite';            // after like
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

import shadcnProfile from '@/pages/shadcnProfile.jpeg'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import BASE_URL from "@/lib/baseUrl";
  

export default function Post(postID) {
    const [post, setPost] = useState({})
    const [profileImage, setProfileImage] = useState(null)
    const [entityID, setEntityID] = useState(null)
    const [entityName, setEntityName] = useState(null)
    const [entityCategory, setEntityCategory] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.post(`${BASE_URL}:8000/get_posts_by_ids/`,
            {
                post_id: postID.postID
            },
        )
        .then(response => {
            console.log(response.data)
            setPost(response.data)
            axios.post(`${BASE_URL}:8000/entity_from_searchresult/`, {id: response.data.searchresult})
            .then(response => {
                console.log(response.data)
                setEntityID(response.data.entity_id)
                setEntityName(response.data.name)
                setEntityCategory(response.data.category)
            })
            .catch(error => {
                console.log(error)
            })
            axios.post(`${BASE_URL}:8000/basic_user_info/`, {username: response.data.author})
            .then(response => {
                console.log(response.data)
                setProfileImage(response.data.profile_image)
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    const [isBookmark, setIsBookmark] = useState(false);

    const toggleBookmark = () => {
        setIsBookmark(!isBookmark);
    }

    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    }

    const mockData = {
        user: { 
            name: "Elif Nur Deniz",
            username: "elfnrdeniz",
            profileImage: "data:image/jpeg;base64,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"
        },
        content: "Notre-Dame de Paris (French: [nɔtʁ(ə) dam də paʁi] ; meaning \"Our Lady of Paris\"), referred to simply as Notre-Dame, is a medieval Catholic cathedral on the Île de la Cité (an island in the Seine River), in the 4th arrondissement of Paris, France. The cathedral, dedicated to the Virgin Mary, is considered one of the finest examples of French Gothic architecture. Several attributes set it apart from the earlier Romanesque style, particularly its pioneering use of the rib vault and flying buttress, its enormous and colourful rose windows, and the naturalism and abundance of its sculptural decoration. Notre-Dame also stands out for its three pipe organs (one historic) and its immense church bells.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Wien_-_Wotrubakirche_%286%29.JPG/1200px-Wien_-_Wotrubakirche_%286%29.JPG?20200528153424",
        likeCount: 30,
        commentCount: 10,
        tags: [{name: "Paris", id: "123"}],
        date: "16.05.2022 12:00 PM"
    }
    return (
        <div className="flex justify-center mb-8">
            <div className="w-full flex-col rounded-md shadow-sm border p-3 mx-auto relative">
                <div className="flex flex-row items-center mb-3 gap-2">
                    <img 
                        src={profileImage ? profileImage : shadcnProfile} 
                        alt="Profile" 
                        className="left-3 w-12 h-12 rounded-full object-cover" 
                        style={{ objectFit: 'cover' }}
                    />
                    {/* User Info */}
                    <div className="flex flex-col">
                        <h1 className="font-bold text-2xl">{post.author_name}</h1>
                        <p className="text-xl">@{post.author}</p>
                    </div>
                </div>
                {/* Second Row */}
                <div className="flex flex-col items-center justify-center mb-3 mt-3 gap-2">
                    <div className="flex flex-col items-center mb-3">
                        <img 
                            src={mockData.image} 
                            alt="image" 
                            className="object-cover rounded-md" 
                            style={{ objectFit: 'cover'}}
                        />
                        <p style={{ marginTop: '20px' }}>{post.text}</p>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between mb-3 mt-3 gap-2 relative">
                    <div className="flex flex-row justify-between text-zinc-400">
                        <p>{mockData.date}</p>
                    </div>
                    <div className="flex right-1 flex-row gap-2">
                        <button onClick={() => {
                            navigate(`/wiki/${entityCategory}/${entityID}`);
                            navigate(0);
                        }} className=" right-1 bg-black rounded-md p-1 text-white">
                            <p>#{entityName}</p>
                        </button>
                    </div>
                </div>


                <Separator orientation="horizontal" />


                {/* Third Row */}
                <div className="flex flex-col items-center mb-3 mt-3">
                    <div className="flex flex-row w-full justify-between gap-3 ml-3 mr-3">
                        <div className="flex flex-row gap-1">
                            <Button variant="ghost" className='w-10' onClick={toggleFavorite}>
                                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </Button>
                            <div className="w-10 mt-2">
                                <p>{post.likes_count}</p>
                            </div>
                            
                            
                        </div>
                        <div className="flex flex-row gap-1">
                            <Button variant="ghost" className='w-10'><ChatBubbleOutlineIcon /></Button>

                        </div>
                        <Button variant="ghost" className='w-10' onClick={toggleBookmark}>
                            {isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </Button>
                        <DropdownMenu>
                        <DropdownMenuTrigger><Button variant="ghost" className='w-10'><ShareIcon /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <div className="px-2">{`${BASE_URL}:5173/post/${postID.postID}`}</div>
                        </DropdownMenuContent>
                        </DropdownMenu>

                        
                    </div>
                    {/* Content for the third row */}
                </div>
            
            </div>
        </div>




        
    )
}