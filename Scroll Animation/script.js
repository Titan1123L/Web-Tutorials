// script.js
document.addEventListener('DOMContentLoaded', () => {
    const maskedText = document.querySelector('.masked-text');

    const revealImageOnScroll = () => {
        const scrollPosition = window.scrollY;
        const triggerPoint = window.innerHeight * 0.2; // Set a scroll trigger point at 20% of viewport height

        if (scrollPosition > triggerPoint) {
            // Add class to switch to the image background
            maskedText.classList.add('image-background');
        } else {
            // Remove class to switch back to the gradient background
            maskedText.classList.remove('image-background');
        }
    };

    window.addEventListener('scroll', revealImageOnScroll);
    revealImageOnScroll(); // Initial call to set the correct background on page load
});
