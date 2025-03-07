// DOM Elements
const connectButton = document.querySelector('.connect-button');
const modal = document.getElementById('connectModal');
const closeButton = document.querySelector('.close');
const projectCards = document.querySelectorAll('.project-card');
const sections = document.querySelectorAll('section');

// Add animation classes to project cards
projectCards.forEach((card, index) => {
  card.classList.add('fade-in');
  card.style.animationDelay = `${0.1 * (index + 1)}s`;
});

// Modal functionality
connectButton.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'block';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
});

closeButton.addEventListener('click', () => {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
});

// Scroll reveal animation
function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
      section.classList.add('reveal', 'active');
    }
  });
}

// Add reveal class to all sections
sections.forEach(section => {
  section.classList.add('reveal');
});

// Initial check for elements in view
revealOnScroll();

// Listen for scroll events
window.addEventListener('scroll', revealOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add hover effect to experience items
const experienceItems = document.querySelectorAll('.experience-item');
experienceItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-10px)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0)';
  });
});

// Add a subtle parallax effect to the intro section
const intro = document.querySelector('.intro');
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition < 600) {
    intro.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
  }
});

// Add a typing animation to the intro title
function typeWriter(element, text, speed = 50, delay = 500) {
  setTimeout(() => {
    let i = 0;
    const originalText = text;
    element.textContent = '';
    
    function type() {
      if (i < originalText.length) {
        element.textContent += originalText.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }, delay);
}

// Apply typing effect to the intro title if it exists
const introTitle = document.querySelector('.intro h1');
if (introTitle) {
  const originalText = introTitle.textContent;
  typeWriter(introTitle, originalText);
}

// Add a subtle animation to the header on scroll
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  
  // Don't hide header at the top of the page
  if (scrollTop <= 50) {
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
});

// Add a small delay before showing the header again to prevent flickering
let headerTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(headerTimeout);
  
  headerTimeout = setTimeout(() => {
    if (window.scrollY <= 50) {
      header.style.transform = 'translateY(0)';
    }
  }, 150);
});