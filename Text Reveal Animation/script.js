document.addEventListener("DOMContentLoaded", () => {
    const revealText = document.querySelector(".reveal-text");
    const textContainer = document.querySelector(".text-container");

    const letters = revealText.textContent.split('');
    const middleIndex = Math.floor(letters.length / 2); 

    revealText.innerHTML = letters.map((letter, index) => {
        const delay = Math.abs(index - middleIndex); 
        return `<span style="--char-delay: ${delay}">${letter}</span>`;
    }).join('');
    
    setTimeout(() => {
        textContainer.classList.add("revealed");
    }, 500);
   
    setTimeout(() => {
        revealText.classList.add("revealed");
    }, 2000); 
});