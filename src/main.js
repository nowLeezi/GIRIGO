import './style.css'

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Trigger progress bars if motivation section is visible
      if (entry.target.id === 'motivation') {
        animateProgressBars();
      }
    }
  });
}, observerOptions);

// Initialize observers
document.addEventListener('DOMContentLoaded', () => {
  const heroCopy = document.querySelector('.hero-copy');
  const subCopy = document.querySelector('.sub-copy');
  const mainIcon = document.querySelector('.main-icon');
  
  if (heroCopy) observer.observe(heroCopy);
  if (subCopy) observer.observe(subCopy);
  if (mainIcon) observer.observe(mainIcon);
  
  const motivationSection = document.getElementById('motivation');
  if (motivationSection) observer.observe(motivationSection);

  // Initial reveal for Hero
  setTimeout(() => {
    heroCopy?.classList.add('visible');
    subCopy?.classList.add('visible');
    mainIcon?.classList.add('visible');
  }, 300);
});

// Wish Input Logic
const wishInput = document.getElementById('wish-input');
const saveWishBtn = document.getElementById('save-wish-btn');
const wishStatus = document.getElementById('wish-status');
const motivationSection = document.getElementById('motivation');

saveWishBtn?.addEventListener('click', () => {
  if (wishInput?.value.trim().length > 5) {
    wishStatus.style.opacity = '1';
    
    setTimeout(() => {
      motivationSection.style.display = 'flex';
      motivationSection.scrollIntoView({ behavior: 'smooth' });
      observer.observe(motivationSection);
    }, 1000);
  } else {
    alert('당신의 소원을 조금 더 자세히 기록해보세요.');
  }
});

// Progress Bar Animation
function animateProgressBars() {
  const progressFills = document.querySelectorAll('.progress-fill');
  progressFills.forEach(fill => {
    const targetWidth = fill.style.width;
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.width = targetWidth;
    }, 100);
  });
}

// Select Tag Logic
const tags = document.querySelectorAll('.select-tag');
tags.forEach(tag => {
  tag.addEventListener('click', () => {
    tag.classList.toggle('active');
  });
});

// Form Submission
const consultingForm = document.getElementById('consulting-form');
consultingForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const submitBtn = consultingForm.querySelector('button[type="submit"]');
  submitBtn.innerText = '전송 중...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert('당신의 소원이 현실로 향하고 있습니다. 곧 연락드리겠습니다.');
    submitBtn.innerText = '신청 완료';
    consultingForm.reset();
    tags.forEach(t => t.classList.remove('active'));
  }, 2000);
});

// Success Story Auto-Slider
const storiesTrack = document.getElementById('stories-track');
let isScrolling = false;

function autoScrollStories() {
  if (!storiesTrack || isScrolling) return;
  
  const maxScroll = storiesTrack.scrollWidth - storiesTrack.clientWidth;
  if (storiesTrack.scrollLeft >= maxScroll - 1) {
    storiesTrack.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    storiesTrack.scrollBy({ left: 300, behavior: 'smooth' });
  }
}

setInterval(autoScrollStories, 4000);

storiesTrack?.addEventListener('touchstart', () => isScrolling = true);
storiesTrack?.addEventListener('touchend', () => {
  setTimeout(() => isScrolling = false, 5000);
});

// Premium Typing Effect on Input Focus
wishInput?.addEventListener('focus', () => {
  wishInput.style.boxShadow = '0 0 30px rgba(0, 242, 255, 0.2)';
});

wishInput?.addEventListener('blur', () => {
  wishInput.style.boxShadow = 'none';
});
