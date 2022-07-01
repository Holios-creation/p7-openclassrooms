import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComments, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import HandleAdminComment from '../functions/handleAdminComment';
import HandleLike from '../functions/changeLike';
import deleteArticle from '../functions/deleteArticle';
import { Navigate } from "react-router-dom";
import auth from '../functions/auth';

export default function Admin() {

   const [surveyData, setSurveyData] = useState([])

   useEffect(() => {
    const fetchArticle = async () => {
        try {
            fetch("http://localhost:3001/api/article/")
            .then((response) => 
            {
                response.json()
                .then((data) => {
                    console.log(data)
                    setSurveyData(data);
                })
            })
        } catch (err) {
            console.log(err)
        }
    };

    const verifygrade = async () => {
        try {
            const token = sessionStorage.getItem('token');

            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);

            const options = {
                method: 'GET',
                headers
            };

            fetch("http://localhost:3001/api/auth/verifyuser", options)
            .then((response) => 
            {
                response.json()
                .then((data) => {
                    console.log(data[0].grade)
                    if(data[0].grade === 1) {
                        fetchArticle();
                    } else {
                        alert("Vous n'êtes pas autorisé à accéder à ce contenu !");
                        window.location.href = "/";
                    }
                    
                })
            })
        } catch (err) {
            console.log(err)
        }
    };
      
      verifygrade();

   }, []);

   if (auth() === false) {

        return <Navigate to='/'/>

    }
    
   return (
		<div className="Home">
         <section className="Home-home">
            <div className="articles">
               {
                  surveyData.map((article) => {
                     var date = new Date(article.date)
                     date = date.toISOString().substring(0, 10);
                     console.log(Object.entries(article))
                     
                     return (
                        <div className="article" key={article.id}>
                           <article className="articleArticle" id={article.id}>
                              <div className="top">
                                <div className="user">
                                    <img className="pictureAuthorProfile" src={article.profilePicture} alt="Profil de l'utilisateur" />
                                    <div className="texts">
                                        <p className="nameAuthorProfile">{article.name}</p>
                                        <p className="informationsArticle">{date}</p>
                                    </div>
                                </div>
                                <FontAwesomeIcon icon={faXmark} className="icons" onClick={() => deleteArticle(article.id)}/>
                              </div>
                              <div className="content">
                                 <h2>{article.titre}</h2>
                                 <img className="pictureArticle" src={article.image} alt="Représentation de l'article" />
                              </div>
                              <div className="bottom">
                                 <div className="left">
                                    <div className="backgroundHover" onClick={() => HandleLike(article.id)}>
                                       <FontAwesomeIcon icon={faThumbsUp} className="icons"/>
                                    </div>
                                    <p className="numbersLikesArticle">{article.like}</p>
                                 </div>
                                 <div className="right">
                                    <a className="createComent" href={"/article/" + article.id}>
                                       <div className="backgroundHover">
                                          <FontAwesomeIcon icon={faPaperPlane} className="icons"/>
                                       </div>
                                    </a>
                                    <div className="numberComent">
                                       <div className="backgroundHover" onClick={() => HandleAdminComment(article.id)}>
                                          <FontAwesomeIcon icon={faComments} className="icons"/>
                                       </div>
                                       <p className="numbersCommentsArticle">{article.comment - 1}</p>
                                    </div> 
                                 </div>
                              </div>
                              <div className="comments"></div>
                           </article>
                        </div>
                     )
                  })
               }
            </div>
         </section>
		</div>
	)
}