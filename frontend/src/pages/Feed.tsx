import { Navbar } from '../components'

import { useAuth } from '../hooks'

export default function Feed() {
    const { isAuth } = useAuth()

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