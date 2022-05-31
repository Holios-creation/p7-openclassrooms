import '../styles/Compte.css';
import React, { useState, useEffect } from 'react';
import auth from '../functions/auth';
import { Navigate } from "react-router-dom";

export default function Compte() {
    const [Data, setData] = useState([])

    useEffect(() => {

        const token = sessionStorage.getItem('token');

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);

        const options = {
            method: 'GET',
            headers
        };
        
        fetch("http://localhost:3001/api/article/user", options)
        .then((response) =>
            {
                response.json()
                .then((data) => {
                    console.log(data)
                    setData(data);
            })
        })

    }, []);

    if (auth() === false) {

        return <Navigate to='/'/>

    }

    function handleSubmit(event) {
        const token = sessionStorage.getItem('token');

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        
        if(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[\w-]{2,4}$/.test(document.getElementById('email').value) === true && document.getElementById('email').value !== "" && /^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+/=@#(!?:.,_$€§%^¨£)]*$/.test(document.getElementById('mdp').value) === true && document.getElementById('mdp').value !== "") {
            const json = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('mdp').value,
            }

            const validate = fetch("http://localhost:3001/api/article/user", {
                method: "PUT",
                headers,
                body: JSON.stringify(json)
            }).then(function(res) {
                console.log(res);
                    if (res.ok) {
                        return res.json();
                    }
                    return res.json().then(json => {throw new Error(json.error)})
                }).catch(function(err) {
                    alert(err.message);
            });

            if(validate){
                sessionStorage.setItem('token', validate.token);
                console.log(validate.token);
                window.location.reload();
            }
        } else {
            event.preventDefault();
            alert("Les entrées sont incorrectes, veuillez corriger le format de celles-ci !");
        }
    }
    
    return (
        <div className="Compte">
            <div className="Compte-compte">
                {
                    Data.map(data => {
                        return (
                            <form className="formulaire" onSubmit={handleSubmit()}>
                                <label htmlFor="email">Email :</label>
                                <input type="email" id="email" name="email" placeholder="contact@groupomania.fr" defaultValue={data.email} pattern="^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$" required />
                                <label htmlFor="mdp">Mot de passe :</label>
                                <input type="text" id="mdp" name="mdp" placeholder="********" pattern="^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+/=@#(!?:.,_$€§%^¨£)]*$" required />
                                <label htmlFor="name">Prénom et nom :</label>
                                <input type="text" id="name" name="name" placeholder="Jack DUPONT" defaultValue={data.name} pattern="^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ]*$" required />
                                <input type="submit" value="Appliquer les modifications !" />
                            </form>
                        )
                    })
                }
            </div>
        </div>
    )
}