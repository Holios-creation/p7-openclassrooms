import { useParams } from 'react-router-dom'

function Error() {
    const { erreur } = useParams()

    var error = erreur ? erreur : "Oups 🙈 Cette page n'existe pas"

    return (
        <div>
            <h1>{error}</h1>
        </div>
    )
}
 
export default Error