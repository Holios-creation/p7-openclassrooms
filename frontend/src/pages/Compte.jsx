import '../styles/Compte.css';
import React, { useState, useEffect } from 'react';
import auth from '../functions/auth';
import handleSubmit from '../functions/compteData';
import { Navigate } from "react-router-dom";

export default function Compte() {
    const [Data, setData] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
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
        }

        fetchUser()

    }, []);

    if (auth() === false) {

        return <Navigate to='/'/>

    }

    return (
        <div className="Compte">
            <div className="Compte-compte">
                {
                    Data.map(data => {
                        return (
                            <form className="formulaire" onSubmit={handleSubmit} key={data.id}>
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