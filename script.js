document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    const headerHeight = document.querySelector('nav').offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    history.pushState(null, null, targetId);
  });
});

const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
document.querySelector('nav .container').appendChild(hamburger);

const navList = document.querySelector('.nav-list');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navList.classList.toggle('active');
});

document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navList.classList.remove('active');
  });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(section => {
  fadeInObserver.observe(section);
});

const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('stagger-visible');
      }, index * 150);
    }
  });
}, { threshold: 0.1 });

//  exam-item to the stagger observer
document.querySelectorAll('.project-card, .certificate-item, .pre-test-item, .post-test-item, .exam-item').forEach((item, index) => {
  staggerObserver.observe(item);
});

const preloadResources = () => {
  const links = [
    { href: 'styles.css', as: 'style' },
    { href: 'script.js', as: 'script' }
  ];
  
  links.forEach(link => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = link.href;
    preloadLink.as = link.as;
    document.head.appendChild(preloadLink);
  });
};


document.addEventListener('DOMContentLoaded', function() {
  const examItem = document.querySelector('.exam-item');
  const examImages = document.querySelectorAll('.exam-image');
  const prevBtn = document.querySelector('.exam-prev');
  const nextBtn = document.querySelector('.exam-next');
  const dots = document.querySelectorAll('.exam-dots .dot');
  
  let currentIndex = 0;
  const totalImages = examImages.length;
  
  function updateSlider() {
      examItem.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
      });
  }
  
  nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalImages;
      updateSlider();
  });
  
  prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateSlider();
  });
  
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentIndex = index;
          updateSlider();
      });
  });
});