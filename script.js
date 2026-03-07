const links = document.querySelectorAll('.menu a');
const elements = document.querySelectorAll('.fade-up');
const header = document.querySelector('.site-header');
const heroSection = document.querySelector('.hero');
const sections = document.querySelectorAll('section');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

links.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);

        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.3
});

elements.forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
    const heroBottom = heroSection.offsetHeight;

    if (window.scrollY > heroBottom - 70) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('light-section')) {
                header.classList.add('light');
                header.classList.remove('dark');
            } else {
                header.classList.add('dark');
                header.classList.remove('light');
            }
        }
    });
}, {
    threshold: 0.6
});

sections.forEach(section => headerObserver.observe(section));

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
});

links.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);

        section.scrollIntoView({
            behavior: 'smooth'
        });

        menu.classList.remove('open');
    });
});