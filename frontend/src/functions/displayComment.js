export default function DisplayComment({data}) {
    return(
        data.map((comment) => {
            return(
            <div className="comment" key={comment.id}>
                <p className="textComment">{comment.text}</p>
            </div>
            )
        })
    )
 }