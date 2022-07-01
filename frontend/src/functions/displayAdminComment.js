import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import deleteComment from '../functions/deleteComment';

export default function DisplayAdminComment({data}) {
    return(
        data.map((comment) => {
            if (comment.text != null) {
                console.log(comment.text);
                return(
                <div className="comment" key={comment.id}>
                    <p className="textComment">{comment.text}</p>
                    <FontAwesomeIcon icon={faXmark} className="icons" onClick={() => deleteComment(comment.id)}/>
                </div>
                )
            }
        })
    )
 }