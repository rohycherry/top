// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const thumbs = document.querySelectorAll('.thumb');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pauseBtn = document.getElementById('pause-btn');
    
    // Initialize variables
    let currentSlide = 0;
    let slideInterval;
    let isPlaying = true;
    let startX, endX;
    
    // Initialize slider function
    function initSlider() {
        // Start autoplay
        startSlideShow();
        
        // Add event listeners for buttons
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Pause/play button functionality
        pauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                stopSlideShow();
                pauseBtn.innerHTML = '<i class="fas fa-play"></i> Play Slide';
            } else {
                startSlideShow();
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Slide';
            }
            isPlaying = !isPlaying;
        });
        
        // Add click events to thumbnails
        thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Add touch events for mobile swipe
        slider.addEventListener('touchstart', touchStart);
        slider.addEventListener('touchend', touchEnd);
    }
    
    // Touch start event handler
    function touchStart(e) {
        startX = e.touches[0].clientX;
    }
    
    // Touch end event handler
    function touchEnd(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }
    
    // Handle swipe gestures
    function handleSwipe() {
        if (startX - endX > 50) {
            // Swipe left - next slide
            nextSlide();
        } else if (endX - startX > 50) {
            // Swipe right - previous slide
            prevSlide();
        }
    }
    
    // Start slideshow autoplay
    function startSlideShow() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    // Stop slideshow autoplay
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Go to specific slide
    function goToSlide(n) {
        currentSlide = n;
        updateSlider();
    }
    
    // Move to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    // Move to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // Update slider position and active thumbnail
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active thumbnail
        thumbs.forEach((thumb, index) => {
            if (index === currentSlide) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
        
        // Restart timer if we're playing
        if (isPlaying) {
            stopSlideShow();
            startSlideShow();
        }
    }
    
    // Initialize the slider
    initSlider();
});