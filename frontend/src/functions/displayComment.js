export default function DisplayComment({data}) {
    return(
        data.map((comment) => {
            if (comment.text != null) {
                console.log(comment.text);
                return(
                <div className="comment" key={comment.id}>
                    <p className="textComment">{comment.text}</p>
                </div>
                )
            }
        })
    )
 }