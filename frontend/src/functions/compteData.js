export default function handleSubmit(event) {
    event.preventDefault();
    const token = sessionStorage.getItem('token');

    const myheaders = new Headers();
    myheaders.append('Authorization', `Bearer ${token}`);
    
    if(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[\w-]{2,4}$/.test(document.getElementById('email').value) === true && document.getElementById('email').value !== "" && /^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+/=@#(!?:.,_$€§%^¨£)]*$/.test(document.getElementById('mdp').value) === true && document.getElementById('mdp').value !== "") {
        var data = new FormData();
        data.append('name', document.getElementById('name').value);
        data.append('email', document.getElementById('email').value);
        data.append('password', document.getElementById('mdp').value);

        fetch("http://localhost:3001/api/article/user", {
            method: "POST",
            body: data,
            headers: myheaders
        }).then(function(res) {
            console.log(res);
                if (res.ok) {
                    return res.json();
                }
                return res.json().then(json => {throw new Error(json.error)})
            }).catch(function(err) {
                alert(err.message);
        });

    } else {
        event.preventDefault();
        alert("Les entrées sont incorrectes, veuillez corriger le format de celles-ci !");
    }
}