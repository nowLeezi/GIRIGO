import './style.css'
import axios from 'axios';

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
consultingForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = consultingForm.querySelector('button[type="submit"]');
  
  // 데이터 수집
  const userName = document.getElementById('user-name').value;
  const userAge = document.getElementById('user-age').value;
  const userPhone = document.getElementById('user-phone').value;
  const selectedTags = Array.from(document.querySelectorAll('.select-tag.active')).map(tag => tag.innerText);
  const userWish = document.getElementById('wish-input')?.value || '';

  const formData = {
    name: userName,
    age: userAge,
    phone: userPhone,
    interests: selectedTags,
    wish: userWish,
    submittedAt: new Date().toISOString()
  };

  submitBtn.innerText = '서버로 전송 중...';
  submitBtn.disabled = true;

  try {
    // 💡 Formspree 이메일 연동 (무료)
    // 1. https://formspree.io/ 에 가입 후 새 Form을 만듭니다.
    // 2. 발급받은 Endpoint URL을 아래 API_URL에 붙여넣습니다. (예: 'https://formspree.io/f/mvoeqqab')
    const API_URL = 'https://formspree.io/f/mwvzvjpb';
    
    if (API_URL === '여기에_FORMSPREE_주소를_입력하세요') {
      alert('알림: 개발자 모드입니다. 코드(src/main.js)를 열어 Formspree 주소를 먼저 입력해 주세요!');
      submitBtn.innerText = '현실로 만들기';
      submitBtn.disabled = false;
      return;
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('✅ [이메일 전송 성공]:', response.data);
    alert(`[${userName}님] 데이터 전송 완료!\n입력하신 정보가 담당자 이메일로 안전하게 전달되었습니다.`);
    
    // 폼 초기화
    consultingForm.reset();
    tags.forEach(t => t.classList.remove('active'));
    
  } catch (error) {
    console.error('❌ [서버 전송 에러]:', error);
    alert('서버 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
  } finally {
    // 버튼 원상복구
    submitBtn.innerText = '현실로 만들기';
    submitBtn.disabled = false;
  }
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
