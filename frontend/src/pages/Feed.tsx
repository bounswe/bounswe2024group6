import { Button } from '@/components/ui/button'
import { Navbar } from '../components'
import { Post } from '../components'

import { useAuth } from '../hooks'

export default function Feed() {
    const { checkAuth } = useAuth()
    const isAuth = checkAuth()

    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="flex flex-row justify-center w-full">
                <div className="w-5/12 bg-red-700">
                    {
                        isAuth
                        ?
                            <h1>Auth User Feed</h1>
                        :
                            null
                            
                    }
                </div>
            </div>
        </div>
    )
}