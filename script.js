const heroText = document.querySelector('.hero p');
const heroSub = document.querySelector('.hero span')
const heroImage = document.querySelector('.hero img');
const texts = ['SWEEET', 'BIGGGER!', 'PIZZZA!']; 
const subs = ['NEW FRUTO CAKE', 'NEW BIG BURGER', 'ITALIAN PIZZAS']
const images = ['images/sweet.png', 'images/burger.png', 'images/pizza.png']; 
let currentIndex = 0;

let isAuth = window.localStorage.getItem('isAuth') || false;
if(isAuth){
    document.querySelector(".fa-burger").href = "cart.html";
    document.querySelector(".fa-user").href = "profile.html";
    document.querySelector(".buttons a").href = "menu.html";
}

function loopContent() {
    heroText.classList.add('hidden');
    heroSub.classList.add('hidden');
    heroImage.classList.add('hidden');
    setTimeout(() => {
        heroText.textContent = texts[currentIndex];
        heroSub.textContent = subs[currentIndex];
        heroImage.src = images[currentIndex];
        heroText.classList.remove('hidden');
        heroSub.classList.remove('hidden');
        heroImage.classList.remove('hidden');

        currentIndex = (currentIndex + 1) % texts.length; 

        setTimeout(loopContent, 3000); 
    }, 1000); 
}

loopContent();
