// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Form submission handling (fixed for Formspree)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent default page reload

    const form = e.target;
    const data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        } else {
            alert('Oops! There was a problem submitting your form.');
        }
    })
    .catch(error => {
        alert('Oops! There was a problem submitting your form.');
        console.error(error);
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = '#fff';
        header.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.querySelector('nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        document.querySelector('.nav-links').classList.remove('active');
    }
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .project-card, .team-member');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if(position.top < window.innerHeight - 100) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .project-card, .team-member');
    
    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger initial animation check
    setTimeout(animateOnScroll, 100);
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Dropdown menu functionality for Mobile User (fixed)
document.addEventListener("DOMContentLoaded", function () {
  const dropdownParents = document.querySelectorAll("ul li:has(ul.dropdown-options)");

  dropdownParents.forEach(parent => {
    parent.addEventListener("click", function (e) {
      // Only block default if NOT clicking an <a>
      if (e.target.tagName !== "A") {
        e.preventDefault();
        this.querySelector("ul.dropdown-options").classList.toggle("show");
      }
    });
  });
});

const cards = document.querySelectorAll('.Inner-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// language Selection
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en', includedLanguages: 'en,km', autoDisplay: false },
    'google_translate_element'
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const options = document.querySelectorAll(".lang-options li");
  const currentFlag = document.getElementById("current-flag");
  const currentLang = document.getElementById("current-lang");

  options.forEach(opt => {
    opt.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      currentLang.textContent = this.textContent.trim();
      currentFlag.src = lang === "en" ? "flag-en.png" : "flag-kh.png";

      // Trigger Google Translate
      const googleFrame = document.querySelector("iframe.goog-te-menu-frame");
      if (googleFrame) {
        const innerDoc = googleFrame.contentDocument || googleFrame.contentWindow.document;
        const langElements = innerDoc.querySelectorAll(".goog-te-menu2-item span.text");
        langElements.forEach(el => {
          if (el.innerText.toLowerCase().indexOf(lang === "km" ? "khmer" : "english") > -1) {
            el.click();
          }
        });
      }
    });
  });
});

