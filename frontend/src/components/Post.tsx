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
import BASE_URL from '../lib/baseUrl'


import shadcnProfile from '@/pages/shadcnProfile.jpeg'

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
            .then(response1 => {
                //console.log(response1.data)
                setEntityID(response1.data.entity_id)
                setEntityName(response1.data.name)
                setEntityCategory(response1.data.category)
            })
            .catch(error => {
                console.log(error)
            })
            axios.post(`${BASE_URL}:8000/basic_user_info/`, {username: response.data.author})
            .then(response2 => {
                //console.log(response2.data)
                setProfileImage(response2.data.profile_image)
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

    const date = new Date(post.created_at)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    
    // Extract time components
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    
    // Create the formatted date string
    const formattedDate = `${day}.${month}.${year} ${hour}:${minute}`;
    
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
                        {post.image ? (
                            <img 
                            src={post.image.image_url} 
                            alt="image" 
                            className="object-cover rounded-md" 
                            style={{ objectFit: 'cover'}}
                            />)
                            :
                            (<div></div>)
                        }
                        
                        <p style={{ marginTop: '20px' }}>{post.text}</p>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between mb-3 mt-3 gap-2 relative">
                    <div className="flex flex-row justify-between text-zinc-400">
                        <p>{formattedDate}</p>
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
                        <Button variant="ghost" className='w-10'><ShareIcon /></Button>
                        
                    </div>
                    {/* Content for the third row */}
                </div>
            
            </div>
        </div>




        
    )
}