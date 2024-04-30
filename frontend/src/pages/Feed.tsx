import { Button } from '@/components/ui/button'
import { Navbar } from '../components'

import { useAuth } from '../hooks'

export default function Feed() {
    const { checkAuth } = useAuth()
    const isAuth = checkAuth()

    return (
        <div>
            <Navbar />
            {
                isAuth
                ?
                    <h1>Auth User Feed</h1>
                :
                    <h1>Guest User Feed</h1>
            }
        </div>
    )
}