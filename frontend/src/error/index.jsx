import '../styles/Error.css';
import { useParams } from 'react-router-dom'

function Error() {
    const { erreur } = useParams()

    var error = erreur ? erreur : "Oups 🙈 Cette page n'existe pas"

    return (
        <div className="Error">
            <div className="Error-error">
                <div className="text">
                    <h1>{error}</h1>
                </div>
            </div>
        </div>
    )
}
 
export default Error