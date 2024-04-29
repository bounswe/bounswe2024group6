import { Navbar } from '../components'

import { useAuth } from '../hooks'

export default function Profile() {
    const { checkAuth } = useAuth()
    const isAuth = checkAuth()

    return (
        <div>
            <Navbar />
            {
                isAuth
                ?
                    <h1>Auth User Profile</h1>
                :
                    <h1>Guest User Profile</h1>
            }
        </div>
    )
}