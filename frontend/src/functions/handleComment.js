import DisplayComment from '../functions/displayComment';
import React from 'react';
import ReactDOM from 'react-dom/client';

export default function HandleComment(id) {

   const container = document.querySelector(`[id='${id}'] .comments`);

   if (container.children.length === 0) {

      var containerRoot = ReactDOM.createRoot(container);

      try {
         fetch(`http://localhost:3001/api/article/comment/${id}`)
         .then((response) => 
         {
            response.json()
            .then((data) => {
               containerRoot.render(
                  <DisplayComment data={data} />
               )
            })
         })
      } catch (err) {
         console.log(err)
      }

   } else {

      while (container.firstChild) {
         container.removeChild(container.firstChild);
      }
      
   }

}