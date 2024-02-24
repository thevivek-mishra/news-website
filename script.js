const API_KEY = 'faf84f778b3a46bcb1ed1edd3e4242e7'
const url = 'https://newsapi.org/v2/everything?q='
window.addEventListener('load', ()=>fetchNews("India"))

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer =document.getElementById('cards-container')
    const newsCardTemlate =document.getElementById('template-news-card')
    // cardsContainer.innerHTML ="";

    articles.forEach(article=>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemlate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone)

    })
}
function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')
    newsImg.src = article.urlToImage
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

}