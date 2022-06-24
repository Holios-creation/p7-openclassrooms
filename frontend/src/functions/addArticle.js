export default function handleSubmit(event) {
    event.preventDefault();
    
    if(/^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+/=@#(!?:.,_$€§%^¨£)]*$/.test(document.getElementById('titre').value) === true && document.getElementById('titre').value !== "" && document.getElementById('image').value !== "") {
        const token = sessionStorage.getItem('token');

        const myheaders = new Headers();
        myheaders.append('Authorization', `Bearer ${token}`);

        const formData = new FormData();
        formData.append('enctype', 'form-data');
		formData.append('image', document.getElementById("image").files[0]);
        formData.append('titre', document.getElementById('titre').value);
        

        fetch("http://localhost:3001/api/article/", {
            method: "POST",
            body: formData,
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
        alert("Les entrées sont incorrectes, veuillez corriger le format de celles-ci !");
    }
}