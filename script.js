document.addEventListener('DOMContentLoaded', function () {

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 80,
                behavior: 'smooth'
            });

            const navLinks = document.querySelector('.nav-links');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Contact form / Formspree
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const form = e.currentTarget;
            const data = new FormData(form);

            fetch(form.action, {
                method: form.method || 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            })
            .then(function (response) {
                if (response.ok) {
                    alert('Thank you for your message! We will get back to you soon.');
                    form.reset();
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            })
            .catch(function (error) {
                console.error(error);
                alert('Oops! There was a problem submitting your form.');
            });
        });
    }

    // Header: transparent on hero, glass effect after scrolling
    const header = document.querySelector('header');

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 70) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Scroll-in animations
    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .team-member'
    );

    animatedElements.forEach(function (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    function animateOnScroll() {
        animatedElements.forEach(function (element) {
            const position = element.getBoundingClientRect();

            if (position.top < window.innerHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll, { passive: true });

    // Project dropdown on mobile
    const dropdownParents = document.querySelectorAll(
        'ul li:has(ul.dropdown-options)'
    );

    dropdownParents.forEach(function (parent) {
        parent.addEventListener('click', function (e) {
            // Don't interfere with actual links.
            if (e.target.closest('a')) return;

            const dropdown = parent.querySelector('ul.dropdown-options');
            if (!dropdown) return;

            e.preventDefault();
            dropdown.classList.toggle('show');
        });
    });

    // Team card flip
    document.querySelectorAll('.Inner-card').forEach(function (card) {
        card.addEventListener('click', function () {
            card.classList.toggle('flipped');
        });
    });

    // Language selector
    const options = document.querySelectorAll('.lang-options li');
    const currentFlag = document.getElementById('current-flag');
    const currentLang = document.getElementById('current-lang');

    options.forEach(function (option) {
        option.addEventListener('click', function () {
            const lang = option.getAttribute('data-lang');

            if (currentLang) {
                currentLang.textContent = option.textContent.trim();
            }

            if (currentFlag) {
                currentFlag.src = lang === 'en' ? 'flag-en.png' : 'flag-kh.png';
            }

            // Google Translate menu may not be ready immediately.
            const googleFrame = document.querySelector('iframe.goog-te-menu-frame');

            if (googleFrame) {
                try {
                    const innerDoc =
                        googleFrame.contentDocument ||
                        googleFrame.contentWindow.document;

                    const languageName = lang === 'km' ? 'khmer' : 'english';

                    innerDoc
                        .querySelectorAll('.goog-te-menu2-item span.text')
                        .forEach(function (item) {
                            if (
                                item.innerText &&
                                item.innerText.toLowerCase().includes(languageName)
                            ) {
                                item.click();
                            }
                        });
                } catch (error) {
                    console.warn('Google Translate menu is not accessible yet.', error);
                }
            }
        });
    });

    // Hero arrow -> Projects
    const heroNext = document.querySelector('.hero-next');

    if (heroNext) {
        heroNext.addEventListener('click', function () {
            const projects = document.getElementById('projects');

            if (projects) {
                window.scrollTo({
                    top: projects.getBoundingClientRect().top + window.scrollY - 70,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Google Translate callback must remain global.
function googleTranslateElementInit() {
    if (
        typeof google === 'undefined' ||
        !google.translate ||
        !document.getElementById('google_translate_element')
    ) {
        return;
    }

    new google.translate.TranslateElement(
        {
            pageLanguage: 'en',
            includedLanguages: 'en,km',
            autoDisplay: false
        },
        'google_translate_element'
    );
}
