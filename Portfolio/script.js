// 모바일 네비게이션 토글
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 스크롤 시 네비게이션 스타일 변경
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Contact 폼 제출 처리
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 폼 데이터 가져오기
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // 실제 프로젝트에서는 여기서 서버로 데이터를 전송합니다
    console.log('폼 제출:', formData);
    
    // 성공 메시지 표시
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = '전송 완료!';
    submitButton.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
    
    // 폼 초기화
    contactForm.reset();
    
    // 3초 후 원래 상태로 복원
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    }, 3000);
    
    // 실제 환경에서는 다음과 같이 사용할 수 있습니다:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // 성공 처리
    // })
    // .catch(error => {
    //     // 에러 처리
    // });
});

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 프로젝트 카드에 애니메이션 적용
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Contact 섹션 애니메이션
const contactSection = document.querySelector('.contact-wrapper');
if (contactSection) {
    contactSection.style.opacity = '0';
    contactSection.style.transform = 'translateY(30px)';
    contactSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(contactSection);
}


