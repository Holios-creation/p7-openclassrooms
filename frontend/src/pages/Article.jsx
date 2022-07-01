import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComments, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import HandleComment from '../functions/handleComment';
import HandleLike from '../functions/changeLike';

export default function Home() {
   const [surveyData, setSurveyData] = useState([])
   const params = useParams();
   console.log(params)

   useEffect(() => {
        const fetchArticle = async () => {
            try {
                await fetch(`http://localhost:3001/api/article/article/${params.id}`)
                .then((response) => 
                {
                    response.json()
                    .then((data) => {
                        console.log(data)
                        setSurveyData(data);
                        HandleComment(params.id);
                    })
                })
            } catch (err) {
                console.log(err)
            }
        };
      
        fetchArticle()

   }, []);
    
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
                                 <a className="createComent" href="/">
                                       <div className="backgroundHover">
                                          <FontAwesomeIcon icon={faArrowLeft} className="icons"/>
                                       </div>
                                    </a>
                                    <div className="numberComent">
                                        <div className="backgroundHover" onClick={() => HandleComment(article.id)}>
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