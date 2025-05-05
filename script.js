const API_KEY ="faf84f778b3a46bcb1ed1edd3e4242e7";
const url = 'https://newsapi.org/v2/everything?q='
window.addEventListener('load', ()=>fetchNews("India"))
function reload(){
    window.location.reload();
}
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!data.articles) {
            console.error("No articles found in response:", data);
            return;
        }

        bindData(data.articles);
    } catch (err) {
        console.error("Error fetching news:", err);
    }
}


function bindData(articles){
    const cardsContainer =document.getElementById('cards-container')
    const newsCardTemlate =document.getElementById('template-news-card')
    cardsContainer.innerHTML ="";

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
    const date = new Date(article.publishedAt).toLocaleDateString('en-US',{timeZone:"asia/jakarta"});
    newsSource.innerHTML = `${article.source.name}. ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank");
    })

}
let curSelectedNav =null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem =document.getElementById(id)
    curSelectedNav?.classList.remove("active")
    curSelectedNav = navItem
    curSelectedNav.classList.add('active')
    console.log(id)
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-input')

searchButton.addEventListener('click',()=>{
    const query =searchText.value;
    if(!query) return;
    fetchNews(query)
    curSelectedNav?.classList.remove('active')
})

