const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function hideLoading(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote(){
    
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        // Hiding quote container
        loading();

        let rand;
        const response = await fetch(apiUrl);
        const data = await response.json();
        rand = Math.floor(Math.random() * data.length );

        const {text, author} = data[rand];
        console.log(text);

        // If author is blank, then it will be assigned Unknown
        if(author === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = author;
        }

        // Reduce size for long quotes
        if(text.length > 120) {
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = text;
        
        // Hiding loader
        hideLoading();

    }catch(err){
        console.log('Whoops no Quote',err);
    }
}


// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text= ${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On Load
getQuote();
