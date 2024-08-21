function createStar() {
    const $star = document.createElement('div');
    $star.classList.add('star');
    
    $star.style.left = `${Math.random() * 100}vw`;
    $star.style.animationDuration = `${2 + Math.random() * 3}s`; // Duration between 2 and 5 seconds

    document.querySelector('.stars').appendChild($star);

    // Remove star after animations end
    setTimeout(() => {
        $star.remove();
    }, 5000);
}

// Generates a star every 100ms
setInterval(createStar, 100);