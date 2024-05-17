import { Navbar, Post } from "@/components"
import { useParams } from 'react-router-dom';


export default function PostPage() {
    let { postID } = useParams();
    return (
        <div className="h-screen w-screen">
            <Navbar />
            <div className="flex flex-row justify-center w-full pt-3">
                <div className="w-5/12">
                    <Post postID={postID}/>
                </div>
            </div>
        </div>
    )

}