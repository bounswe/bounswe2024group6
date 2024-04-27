import { Navbar } from '../components'

import { useAuth } from '../hooks'

export default function Profile() {
    const { isAuth } = useAuth()

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