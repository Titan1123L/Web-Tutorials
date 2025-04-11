window.onload = () => {
    setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('container').style.opacity = '1';
    }, 4000); // Show the overlay for 4 seconds

    // Typing sound effect
    let audio = new Audio('Computer-keyboard-fast(chosic.com).mp3');
    let typingText = document.querySelector('.typing-text');
    typingText.addEventListener('animationiteration', () => {
        audio.play();
    });

    // Hover effect on the card for a 3D flip
    const card = document.getElementById('card');
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'rotateY(180deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg)';
    });

    // Changing background color on click
    document.body.addEventListener('click', () => {
        document.body.style.backgroundColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
    });
};

// Add frame appearance on scroll
window.addEventListener('scroll', () => {
    const frames = document.querySelectorAll('.frames');
    frames.forEach((frame, index) => {
        const framePosition = frame.getBoundingClientRect().top;
        if (framePosition < window.innerHeight - 100) {
            frame.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }
    });
});