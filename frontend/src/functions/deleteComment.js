export default function DeleteComment(id) {

    const token = sessionStorage.getItem('token');

    const myheaders = new Headers();
    myheaders.append('Authorization', `Bearer ${token}`);

    try {
        const validate = fetch(`http://localhost:3001/api/article/deleteComment/${id}`, {
            method: "GET",
            headers: myheaders
        })
        .then((response) => 
        {
            return response.json()
        })

        if(validate) {
            window.location.reload();
        }
        
    } catch (err) {
        console.log(err)
    }

}