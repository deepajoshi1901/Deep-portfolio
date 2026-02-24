// Typing Animation
const text = ["Frontend Developer", "C++ Learner", "Future Software Engineer"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type(){
    if(count === text.length){
        count = 0;
    }
    currentText = text[count];
    letter = currentText.slice(0, ++index);

    document.querySelector(".typing").textContent = letter;

    if(letter.length === currentText.length){
        count++;
        index = 0;
        setTimeout(type, 1000);
    } else{
        setTimeout(type, 100);
    }
})();

// Theme Toggle
function toggleTheme(){
    document.body.classList.toggle("light");
}

// Scroll Reveal
window.addEventListener("scroll", function(){
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;

        if(revealTop < windowHeight - revealPoint){
            reveal.classList.add("active");

            // Animate skill bars
            const bars = reveal.querySelectorAll(".progress div");
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute("style").split(":")[1];
            });
        }
    });
});

// Mobile Menu
function toggleMenu(){
    document.querySelector(".nav-links").classList.toggle("active");
}

// Smooth Scroll
function scrollToSection(id){
    document.getElementById(id).scrollIntoView({behavior:"smooth"});
}