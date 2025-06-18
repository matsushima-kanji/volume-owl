// Volume Owl Landing Page JavaScript

function showWarningDemo() {
    const modal = document.getElementById('warningModal');
    const demoButton = document.querySelector('.demo-button');
    
    // Show modal with animation
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Disable demo button temporarily
    demoButton.disabled = true;
    demoButton.textContent = '警告表示中...';
    
    // Add shake animation to the warning dialog
    const warningDialog = document.querySelector('.warning-dialog');
    warningDialog.classList.add('shake');
    
    // Play alert sound effect (if available)
    try {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Audio API not available or blocked
        console.log('Audio playback not available');
    }
}

function closeWarningDemo() {
    const modal = document.getElementById('warningModal');
    const demoButton = document.querySelector('.demo-button');
    const warningDialog = document.querySelector('.warning-dialog');
    
    // Hide modal with animation
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        warningDialog.classList.remove('shake');
    }, 300);
    
    // Re-enable demo button
    setTimeout(() => {
        demoButton.disabled = false;
        demoButton.textContent = '⚠️ 警告デモを見る';
    }, 1000);
}

// Close modal when clicking outside
document.getElementById('warningModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeWarningDemo();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('warningModal');
        if (modal.classList.contains('show')) {
            closeWarningDemo();
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add floating animation to hero owl
document.addEventListener('DOMContentLoaded', function() {
    const heroOwl = document.querySelector('.hero-icon');
    if (heroOwl) {
        // Add random delay to make it more natural
        const randomDelay = Math.random() * 2;
        heroOwl.style.animationDelay = randomDelay + 's';
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.problem-item, .feature-item, .testimonial-item, .workflow-step');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});