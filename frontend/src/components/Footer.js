import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import auth from '../functions/auth';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();

        if(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[\w-]{2,4}$/.test(document.getElementById('email').value) === true && document.getElementById('email').value !== "" && /^[0"9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+\/=@#(!?:.,_$€§%^¨£)]*$/.test(document.getElementById('mdp').value) === true && document.getElementById('mdp').value !== "" && /^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ]*$/.test(document.getElementById('name').value) === true && document.getElementById('name').value !== "" && document.getElementById('image').value !== "") {
            const formData = new FormData();

            formData.append('enctype', 'form-data');
		    formData.append('image', document.getElementById("image").files[0]);
            formData.append('password', document.getElementById("mdp").value)
            formData.append('email', document.getElementById("email").value)
            formData.append('name', document.getElementById("name").value)

            console.log(formData.get("profilePicture"))
            const validate = await fetch("http://localhost:3001/api/auth/signup", {
                method: "POST",
                body: formData
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
            alert("Les entrées sont incorrectes, veuillez corriger le format de celles-ci !");
        }
    }

    render() {
        return (
            <div className="center">
                <form className="login" onSubmit={this.handleSubmit} enctype="form-data">
                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" placeholder="contact@groupomania.fr" pattern="^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$" required />
                    <label htmlFor="mdp">Mot de passe :</label>
                    <input type="text" id="mdp" name="mdp" placeholder="********" pattern="^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+/=@#(!?:.,_$€§%^¨£)]*$" required />
                    <label htmlFor="name">Prénom et nom :</label>
                    <input type="text" id="name" name="name" placeholder="Jack DUPONT" pattern="^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ]*$" required />
                    <label htmlFor="image">Photo de profil :</label>
                    <input type="file" id="image" name="image" accept="image/png, image/jpeg, image/jpg, image/gif" required />
                    <input type="submit" value="S'inscrire !" />
                </form>
                <a href="/" className="redirectionLink">
                    <p>Vous avez déjà un compte ?</p>
                </a>
            </div>
        );
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        if(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[\w-]{2,4}$/.test(document.getElementById('email').value) === true && document.getElementById('email').value !== "" && /^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+/=@#(!?:.,_$€§%^¨£)]*$/.test(document.getElementById('mdp').value) === true && document.getElementById('mdp').value !== "") {
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
            alert("Les entrées sont incorrectes, veuillez corriger le format de celles-ci !");
        }
    }

    render() {
        return (
            <div className="center">
                <form className="login" onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" placeholder="contact@groupomania.fr" pattern="^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$" required />
                    <label htmlFor="mdp">Mot de passe :</label>
                    <input type="text" id="mdp" name="mdp" placeholder="********" pattern="^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+/=@#(!?:.,_$€§%^¨£)]*$" required />
                    <input type="submit" value="Se connecter !" />
                </form>
                <a href="?register=yes" className="redirectionLink">
                    <p>Vous n'êtes pas encore inscrit ?</p>
                </a>
            </div>
        );
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);

        this.sendMessage = this.sendMessage.bind(this);
    }
    
    async sendMessage(event) {
        event.preventDefault();

        if(document.getElementById('message').value !== "") {

            const token = sessionStorage.getItem('token');

            const myheaders = new Headers();
            myheaders.append('Content-Type', 'application/json');
            myheaders.append('Authorization', `Bearer ${token}`);

            const params = this.props.params;

            const json = {
                message: document.getElementById('message').value
            }

            const validate = await fetch(`http://localhost:3001/api/article/comment/${params.id}`, {
                method: "POST",
                headers: myheaders,
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
                window.location.reload();
            }
            
        } else {
            alert("Les entrées sont incorrectes, veuillez corriger le format de celles-ci !");
        }
    }

    render() {
        return (
            <form className="message" onSubmit={this.sendMessage}>
                <input type="text" id="message" name="message" placeholder="Votre message..." required />
                <button type="submit" className="submit">
                    <FontAwesomeIcon icon={faArrowCircleRight} className="icons"/>
                </button>
            </form>
        );
    }
}

class Accueil extends React.Component {
    render() {
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

export default function Footer() {
    const params = useParams();
    if (auth() === false) {
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('register') === true && searchParams.get('register') !== "") {
            return (
                <div className="Footer">
                    <footer className="Footer-footer">
                        <Register />
                    </footer>
                </div>
            )
        } else {
            return (
                <div className="Footer">
                    <footer className="Footer-footer">
                        <Login />
                    </footer>
                </div>
            )
        }
    } else {
        if(params.id === undefined) {
            return (
                <div className="Footer">
                    <footer className="Footer-footer">
                        <Accueil />
                    </footer>
                </div>
            );
        } else {
            return (
                <div className="Footer">
                    <footer className="Footer-footer">
                        <Content params={params}/>
                    </footer>
                </div>
            );
        }
    }
}