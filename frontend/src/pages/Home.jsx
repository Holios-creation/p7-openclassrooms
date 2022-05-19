import '../styles/Content.css';
import React, {useState, useEffect} from 'react';
import ProfilePicture from '../assets/pexels-pixabay-415829.jpg';
import ArticlePicture from '../assets/construction-site.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faComments } from '@fortawesome/free-solid-svg-icons';

function Home() {
   const [surveyData, setSurveyData] = useState([])
   const [isDataLoading, setDataLoading] = useState(false)
   const [error, setError] = useState(null)

   useEffect(() => {
      async function fetchArticle() {
         setDataLoading(true)
         try {
            const response = await fetch("http://localhost:3001/api/article/")
            const data = await response.json()
            setSurveyData(data)
         } catch (err) {
            console.log(err)
            setError(true)
         } finally {
            setDataLoading(false)
         }
      }
      fetchArticle()
   }, []);
    
   return (
		<div className="Home">
         <section className="Home-home">
            <div className="articles">
               {
                  surveyData
                     /*
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
                                    <div className="backgroundHover" onClick="">
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
                              {
                                    comments.forEach(comment => {
                                       <div className="comment">
                                          <p className="textComment">{comment}</p>
                                       </div>
                                    })
                              }
                           </div>
                        </article>
                     </a>*/
               }
            </div>
         </section>
		</div>
	)
}

export default Home;