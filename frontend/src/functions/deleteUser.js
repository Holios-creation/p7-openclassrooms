export default function DeleteUser() {

    const token = sessionStorage.getItem('token');

    const myheaders = new Headers();
    myheaders.append('Authorization', `Bearer ${token}`);

    try {
        const validate = fetch(`http://localhost:3001/api/auth/delete`, {
            method: "POST",
            headers: myheaders
        })
        .then((response) => 
        {
            return response.json()
        })

        if(validate) {
            sessionStorage.removeItem('token');
            window.location.reload();
        }
        
    } catch (err) {
        console.log(err)
    }

}