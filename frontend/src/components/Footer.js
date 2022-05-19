import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faArrowCircleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import auth from '../functions/auth';
import React from 'react';
import { Link } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
   async handleSubmit(event) {
       if(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[\w-]{2,4}$/.test(document.getElementById('email').value) === true && /^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+/=@#(!?:.,_$€§%^¨£)]*$/.test(document.getElementById('mdp').value) === true) {
            event.preventDefault();
            const json = {
                email: document.getElementById('email').value,
                password: document.getElementById('mdp').value,
            }

            const validate = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
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

    render() {
        return (
            <form className="login" onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" placeholder="contact@groupomania.fr" pattern="^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$" required />
                <label htmlFor="mdp">Mot de passe :</label>
                <input type="text" id="mdp" name="mdp" placeholder="********" pattern="^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+/=@#(!?:.,_$€§%^¨£)]*$" required />
                <input type="submit" value="Se connecter !" />
            </form>
        );
    }
}

class Content extends React.Component {
    render() {
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('id') === true && searchParams.get('id') !== "") {
            return (
                <form className="message">
                    <input type="text" id="message" placeholder="Votre message..." required />
                    <div className="image">
                        <FontAwesomeIcon icon={faImage} className="icons"/>
                    </div>
                    <button type="submit" className="submit">
                        <FontAwesomeIcon icon={faArrowCircleRight} className="icons"/>
                    </button>
                </form>
            );
        } else {
            return (
                <div className="items">
                    <Link to="/" className="buttons">
                        <p>Découvrir les différents articles</p>
                    </Link>
                    <Link to="/add" className="add">
                        <FontAwesomeIcon icon={faPlus} className="icons"/>
                    </Link>
                </div>
            );
        }
    }
}

function Footer() {
    if (auth() === false) {
        return (
            <div className="Footer">
                <footer className="Footer-footer">
                    <Login />
                </footer>
            </div>
        )
    } else {
        return (
            <div className="Footer">
                <footer className="Footer-footer">
                    <Content />
                </footer>
            </div>
        );
    }
}

export default Footer;