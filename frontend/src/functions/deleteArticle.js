export default function DeleteArticle(id) {

    const token = sessionStorage.getItem('token');

    const myheaders = new Headers();
    myheaders.append('Authorization', `Bearer ${token}`);

    try {
        const validate = fetch(`http://localhost:3001/api/article/delete/${id}`, {
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