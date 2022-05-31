import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
   const [surveyData, setSurveyData] = useState([])
   const [commentData, setCommentData] = useState([])

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
      
      fetchArticle()

      return () => {
         let searchParams = new URLSearchParams(window.location.search)
         var id = searchParams.get('id')
         document.getElementById(id).className = document.getElementById(id).className.replace( /(?:^|\s)hidden(?!\S)/g , '' )
         try {
            fetch(`http://localhost:3001/api/article/comment/${id}`)
            .then((response) => 
            {
               response.json()
               .then((data) => {
                  console.log(data)
                  setCommentData(data);
               })
            })
         } catch (err) {
            console.log(err)
         }
      };
   }, []);

   function handleLike(id) {
      /*fetch(`http://localhost:3001/api/article/like/${id}`, {
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
      });*/
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
                        <div className="article" key={article.id} >
                           <article className="articleArticle">
                              <div className="top">
                                 <img className="pictureAuthorProfile" src={article.profilePicture} alt="Profil de l'utilisateur" />
                                 <div className="texts">
                                       <p className="nameAuthorProfile">{article.name}</p>
                                       <p className="informationsArticle">{date}</p>
                                 </div>
                              </div>
                              <div className="content">
                                 <h2>{article.titre}</h2>
                                 <img className="pictureArticle" src={article.image} alt="Représentation de l'article" />
                              </div>
                              <div className="bottom">
                                 <div className="left" onClick={handleLike(article.id)}>
                                       <div className="backgroundHover" onClick="">
                                          <FontAwesomeIcon icon={faThumbsUp} className="icons"/>
                                       </div>
                                       <p className="numbersLikesArticle">{article.like}</p>
                                 </div>
                                 <a href={"?id=" + article.id}>
                                    <div className="right">
                                    <FontAwesomeIcon icon={faComments} className="icons"/>
                                          <p className="numbersCommentsArticle">{article.comment}</p>
                                    </div>
                                 </a>
                              </div>
                              <div className="comments hidden" id={article.id}>
                              {
                                 commentData.map((comment) => {
                                    return(
                                       <div className="comment">
                                          <p className="textComment">{comment.text}</p>
                                       </div>
                                    )
                                 })
                              }
                              </div>
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