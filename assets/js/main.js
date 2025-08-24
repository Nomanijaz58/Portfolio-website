// Feather icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.feather) window.feather.replace();
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.navmenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Active link highlighting based on scroll
const sections = Array.from(document.querySelectorAll('main section[id]'));
const links = Array.from(document.querySelectorAll('.navmenu .navlink'));
const setActiveLink = () => {
  let currentId = '';
  const scrollY = window.scrollY + 120;
  for (const section of sections) {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      currentId = section.id;
      break;
    }
  }
  for (const a of links) {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  }
};
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Reveal on scroll + skill bars
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // progress bars
      const bars = entry.target.querySelectorAll('.bar');
      bars.forEach((bar) => {
        const pct = bar.getAttribute('data-level');
        bar.style.setProperty('--level', `${Math.max(0, Math.min(100, Number(pct))) / 100}`);
        bar.classList.add('visible');
      });
    }
  });
},{threshold:0.2});
document.querySelectorAll('[data-animate]').forEach((el)=>revealObserver.observe(el));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Projects modal data
const projectData = {
  'internet-services': {
    title: 'Online Internet Services Website',
    desc: 'Full-stack website enabling users to browse and request internet services. Features admin dashboard and order tracking.',
    cover: 'assets/img/projects/internet-services.jpg',
    tags: ['HTML','CSS','Java','MySQL'],
    demo: '#',
    code: '#'
  },
  'shopping-app': {
    title: 'Shopping Mobile App',
    desc: 'Android app with product browsing, secure login, and cart/checkout system.',
    cover: 'assets/img/projects/shopping-app.jpg',
    tags: ['Android','Java','Firebase Auth'],
    demo: '#',
    code: '#'
  },
  'contact-manager': {
    title: 'Contact Management Web App (MERN)',
    desc: 'Contacts CRUD with RESTful APIs, JWT authentication, and MongoDB.',
    cover: 'assets/img/projects/contact-manager.jpg',
    tags: ['React','Node','Express','MongoDB','JWT'],
    demo: '#',
    code: '#'
  },
  'dairy-ops': {
    title: 'Dairy Operations Management System',
    desc: 'Role-based dashboards, production tracking, and containerized deployment with Docker.',
    cover: 'assets/img/projects/dairy-ops.jpg',
    tags: ['Node','Express','MySQL','Docker'],
    demo: '#',
    code: '#'
  },
  'snake-game': {
    title: 'Snake Game',
    desc: 'Classic console-based snake game written in C/C++ for learning purposes.',
    cover: 'assets/img/projects/snake-game.jpg',
    tags: ['C','C++','Console'],
    demo: '#',
    code: '#'
  }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.querySelector('.modal-desc');
const modalCover = document.querySelector('.modal-cover');
const modalTags = document.querySelector('.modal-tags');
const modalDemo = document.getElementById('modal-demo');
const modalCode = document.getElementById('modal-code');

const openModal = (id) => {
  const data = projectData[id];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalCover.src = data.cover;
  modalCover.alt = `${data.title} cover`;
  modalTags.innerHTML = data.tags.map(t=>`<span class="tag">${t}</span>`).join('');
  modalDemo.href = data.demo;
  modalCode.href = data.code;
  modal.setAttribute('aria-hidden','false');
  modal.setAttribute('aria-modal','true');
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  modal.setAttribute('aria-hidden','true');
  modal.setAttribute('aria-modal','false');
  document.body.style.overflow = '';
};

document.querySelectorAll('.project').forEach((card)=>{
  card.addEventListener('click',()=> openModal(card.getAttribute('data-project')));
});
modal.querySelectorAll('[data-close]').forEach((el)=> el.addEventListener('click', closeModal));
document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closeModal(); });

// Contact form (mailto fallback)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();
    if (!name || !email || !subject || !message) return;
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:n4221891@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
}

