import { useAuth } from '../hooks'

export default function Navbar() {
    const { isAuth } = useAuth()

    return (
        <div>
            {
                isAuth
                ?
                    <h1>Auth User Navbar</h1>
                :
                    <h1>Guest User Navbar</h1>
            }
        </div>
    )
}