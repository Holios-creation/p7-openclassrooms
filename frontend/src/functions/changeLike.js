export default function HandleLike(id) {

    const token = sessionStorage.getItem('token');

    const myheaders = new Headers();
    myheaders.append('Authorization', `Bearer ${token}`);

    try {
        fetch(`http://localhost:3001/api/article/like/${id}`, {
            method: "POST",
            headers: myheaders
        })
        .then((response) => 
        {
            response.json()
                .then((data) => {
                    if(data.indice === '1') {
                        document.querySelector(`[id='${id}'] .bottom .left .numbersLikesArticle`).innerHTML = parseInt(document.querySelector(`[id='${id}'] .bottom .left .numbersLikesArticle`).textContent) + 1;
                        document.querySelector(`[id='${id}'] .bottom .left .backgroundHover .icons`).style.color= "rgb(184 249 192)";
                    } else if (data.indice === '-1') {
                        document.querySelector(`[id='${id}'] .bottom .left .numbersLikesArticle`).innerHTML = parseInt(document.querySelector(`[id='${id}'] .bottom .left .numbersLikesArticle`).textContent) - 1;
                        document.querySelector(`[id='${id}'] .bottom .left .backgroundHover .icons`).style.color= "rgb(255, 208, 208)";
                    } else {
                        console.log(data.indice);
                        console.log("error");
                    }
                })
        })
    } catch (err) {
        console.log(err)
    }

}