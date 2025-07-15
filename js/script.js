document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('navBurger');
    const menu = document.getElementById('mobileMenu');
    const logoLinks = document.querySelectorAll('a[href*="/#hero"] .header__logo, .header__logo[href*="#"]'); // Селектор для логотипа

    function updateScrollLock() {
        if (menu.classList.contains('active')) {
            if (window.innerWidth <= 1024) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeMenu() {
        menu.classList.remove('active');
        burger.classList.remove('open');
        document.body.style.overflow = '';
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && menu.classList.contains('active')) {
            closeMenu();
        } else {
            updateScrollLock();
        }
    });

    menu.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu__content')) {
            closeMenu();
        }
    });

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        menu.classList.toggle('active');
        updateScrollLock();
    });

    // Закрытие меню при клике по ссылке в мобильном меню
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Закрытие меню при клике по логотипу (добавлено)
    logoLinks.forEach(logoLink => {
        logoLink.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                closeMenu();
            }
        });
    });
});

// Находим все элементы с классом .adaptive-text
const elements = document.querySelectorAll('.adapt-btn');

function updateTexts() {
  elements.forEach(el => {
    const span = el.querySelector('span');
    if (!span) return;
    
    span.textContent = window.innerWidth <= 375 
      ? el.dataset.mobile || 'Узнать больше' 
      : el.dataset.desktop || 'Заказать презентацию';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Опционально: отключаем наблюдение после появления
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Срабатывает когда 10% элемента видно
    rootMargin: '0px 0px -50px 0px' // Нижний отступ (можно настроить)
  });

  fadeElements.forEach(el => observer.observe(el));
});

document.querySelectorAll('a[href^="http"]').forEach(link => {
  if (!link.href.includes(window.location.hostname)) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ANIMATION_SETTINGS = {
    baseDelay: 0.1,
    stepDelay: 0.1,
    maxDelay: 0.4,
    threshold: 0.1,
    rootMargin: '0px',
  };

  // Инициализация Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        entry.target.classList.add('visible');
        // Убрали unobserve, чтобы элемент оставался под наблюдением
      }
    });
  }, {
    threshold: ANIMATION_SETTINGS.threshold,
    rootMargin: ANIMATION_SETTINGS.rootMargin
  });

  // Функция для назначения задержек
  function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)'); // Только невидимые элементы
    let currentDelay = ANIMATION_SETTINGS.baseDelay;
    let rowTop = null;
    let maxDelayInRow = ANIMATION_SETTINGS.baseDelay;

    fadeElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      
      if (rowTop !== rect.top) {
        rowTop = rect.top;
        currentDelay = ANIMATION_SETTINGS.baseDelay;
        maxDelayInRow = ANIMATION_SETTINGS.baseDelay;
      } else {
        currentDelay += ANIMATION_SETTINGS.stepDelay;
        maxDelayInRow = Math.max(maxDelayInRow, currentDelay);
      }

      const delay = Math.min(currentDelay, ANIMATION_SETTINGS.maxDelay);
      el.style.transitionDelay = `${delay}s`;
      observer.observe(el);

      if (index < fadeElements.length - 1) {
        const nextRect = fadeElements[index + 1].getBoundingClientRect();
        if (nextRect.top !== rowTop) {
          currentDelay = maxDelayInRow + ANIMATION_SETTINGS.stepDelay;
        }
      }
    });
  }

  // Запускаем инициализацию
  initFadeInAnimations();

  // Реинициализация при изменении размера (но только для новых элементов)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Убираем transitionDelay только у еще не появившихся элементов
      document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        el.style.transitionDelay = '';
      });
      initFadeInAnimations();
    }, 250);
  });
});

// Отключаем smooth-scroll при загрузке, чтобы не было прыжка
document.documentElement.style.scrollBehavior = 'auto';
window.addEventListener('load', () => {
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, 1000);
}); 

document.querySelectorAll('picture').forEach(pic => {
  const img = pic.querySelector('img');
  const firstSource = pic.querySelector('source');
  
  firstSource.addEventListener('error', () => {
    img.style.display = 'block'; // Принудительно показываем <img>
  });
});
