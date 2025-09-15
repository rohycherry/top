document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const thumbs = document.querySelectorAll('.thumb');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pauseBtn = document.getElementById('pause-btn');
    
    let currentSlide = 0;
    let slideInterval;
    let isPlaying = true;
    let startX, endX;
    
    // Initialize slider
    function initSlider() {
        // Start autoplay
        startSlideShow();
        
        // Add event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
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
    
    // Touch events for mobile
    function touchStart(e) {
        startX = e.touches[0].clientX;
    }
    
    function touchEnd(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }
    
    function handleSwipe() {
        if (startX - endX > 50) {
            // Swipe left - next slide
            nextSlide();
        } else if (endX - startX > 50) {
            // Swipe right - previous slide
            prevSlide();
        }
    }
    
    // Start slideshow
    function startSlideShow() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    // Stop slideshow
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Go to specific slide
    function goToSlide(n) {
        currentSlide = n;
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    // Previous slide
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