const heroText = document.querySelector('.hero p');
const heroSub = document.querySelector('.hero span')
const heroImage = document.querySelector('.hero img'); // Select the image
const texts = ['SWEEET', 'BIGGGER!', 'PIZZZA!']; // Array of texts to loop through
const subs = ['NEW FRUTO CAKE', 'NEW BIG BURGER', 'ITALIAN PIZZAS']
const images = ['images/sweet.png', 'images/burger.png', 'images/pizza.png']; // Array of image file names
let currentIndex = 0;

let isAuth = window.localStorage.getItem('isAuth') || false;
if(isAuth){
    document.querySelector(".buttons a").href = "menu.html";
}

// Function to update both text and image in a loop
function loopContent() {
    heroText.classList.add('hidden'); // Fade out current text
    heroSub.classList.add('hidden');
    heroImage.classList.add('hidden'); // Optionally fade out the image as well
    setTimeout(() => {
        // Update the text
        heroText.textContent = texts[currentIndex];
        heroSub.textContent = subs[currentIndex];
        heroImage.src = images[currentIndex]; // Update the image source
        heroText.classList.remove('hidden'); // Fade in new text
        heroSub.classList.remove('hidden');
        heroImage.classList.remove('hidden'); // Fade in new image

        // Move to the next text and image in the arrays
        currentIndex = (currentIndex + 1) % texts.length; // Cycle back to 0 after the last item

        // Repeat the function after a delay
        setTimeout(loopContent, 3000); // Wait 3 seconds before the next change
    }, 1000); // Wait for fade-out transition to complete
}

// Start the loop
loopContent();
