import '../styles/Content.css';
import React, {useState, useEffect} from 'react';
import ProfilePicture from '../assets/pexels-pixabay-415829.jpg';
import ArticlePicture from '../assets/construction-site.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faComments } from '@fortawesome/free-solid-svg-icons';

function Articles() {

    const [surveyData, setSurveyData] = useState([])
    const [isDataLoading, setDataLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchArticle() {
            setDataLoading(true)
            try {
                const response = await fetch("http://localhost:3001/api/article/", {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    }
                })
                const { surveyData } = await response.json()
                setSurveyData(surveyData)
                console.log(surveyData)
            }
            catch (err) {
                console.log(err)
                setError(true)
            }
            finally {
                setDataLoading(false)
            }
        }

        fetchArticle()
    }, []);
    

    /**async searchArticle(event) {
        const articles = await fetch("http://localhost:3001/api/article/", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
            return res.json().then(json => {throw new Error(json.error)})
        }).catch(function(err) {
            alert(err.message);
        });
        return articles;
    }

    async searchUser(idCreator) {
        await fetch(`http://localhost:3001/api/article/creator/${idCreator}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
        .then(function(res) {
            console.log(res);
            if (res.ok) {
                return res.json();
            }
            return res.json().then(json => {throw new Error(json.error)})
        }).catch(function(err) {
            alert(err.message);
        });
    }

    async searchComment(id) {
        await fetch(`http://localhost:3001/api/article/comment/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
        .then(function(res) {
            console.log(res);
            if (res.ok) {
                return res.json();
            }
            return res.json().then(json => {throw new Error(json.error)})
        }).catch(function(err) {
            alert(err.message);
        });
    }*/

    function handleComments(event) {
        if (document.getElementsByClassName('comments').className[1] === "hidden") {
            document.getElementsByClassName('comments').removeClass("hidden");
        } else {
            document.getElementsByClassName('comments').addClass("hidden");
        }
    }

    function handleLike(id) {
        fetch(`http://localhost:3001/api/article/like/${id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
        .then(function(res) {
            console.log(res);
            if (res.ok) {
                res.status(200).json({ message: 'Le like à bien été ajouté !' });
            }
            return res.json().then(json => {throw new Error(json.error)})
        }).catch(function(err) {
            alert(err.message);
        });
    }

    return(
        <div className="articles">
            {
                console.log(surveyData)
            }
            {
                surveyData.forEach(article =>
                    <a href={"?id=" + article.id} className="article" key={article.id} >
                        <article className="articleArticle">
                            <div className="top">
                                <img className="pictureAuthorProfile" src={ProfilePicture} alt="Profil de l'utilisateur" />
                                <div className="texts">
                                    <p className="nameAuthorProfile"></p>
                                    <p className="informationsArticle">{article.date}</p>
                                </div>
                            </div>
                            <div className="content">
                                <h2>{article.titre}</h2>
                                <img className="pictureArticle" src={ArticlePicture} alt="Représentation de l'article" />
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    <div className="backgroundHover" onClick={handleLike(article.id)}>
                                        <FontAwesomeIcon icon={faArrowUp} className="icons"/>
                                    </div>
                                    <p className="numbersLikesArticle">{"?id=" + article.like}</p>
                                </div>
                                <div className="right" onClick={this.handleComments}>
                                <FontAwesomeIcon icon={faComments} className="icons"/>
                                    <p className="numbersCommentsArticle"></p>
                                </div>
                            </div>
                            <div className="comments hidden">
                                <div className="title">Commentaires</div>
                                {/*
                                    comments.forEach(comment => {
                                        <div className="comment">
                                            <p className="textComment">{comment}</p>
                                        </div>
                                    })*/
                                }
                            </div>
                        </article>
                    </a>
                )
            }
        </div>
    )
}

function Content() {
    return (
        <div className="Content">
            <section className="Content-content">
                <Articles />
            </section>
        </div>
    );
}

export default Content;