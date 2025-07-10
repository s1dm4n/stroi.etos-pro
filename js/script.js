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

// Инициализация
window.addEventListener('load', updateTexts);
window.addEventListener('resize', updateTexts);

document.addEventListener('DOMContentLoaded', function() {
  const title = document.getElementById('dynamic-title');
  
  if (!title) {
    console.error('Элемент с id="dynamic-title" не найден!');
    return;
  }

  const mediaQuery = window.matchMedia('(max-width: 352px)');

  function updateTitle(e) {
    title.textContent = e.matches 
      ? "Дилеры" 
      : "Дистрибьютеры";
  }

  mediaQuery.addListener(updateTitle);
  updateTitle(mediaQuery); // Инициализация
});

document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: -1,
    freeMode: false,       // Отключаем свободное перетаскивание
    grabCursor: true,      // Курсор "рука" при наведении
    resistance: false,     // Отключаем "упругость" при перетаскивании
    watchSlidesProgress: true,
    touchReleaseOnEdges: true, // Резкое завершение свайпа на границах
    speed: 400,
    freeMode: false,
    // followFinger: false,   // Не следует за пальцем при свайпе
    touchRatio: 1.2,       // Чувствительность свайпа
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 2,
      }
    },
    on: {
      init: function() {
        updateCardsOpacity(this);
      },
      slideChange: function() {
        updateCardsOpacity(this);
      },
      resize: function() {
        updateCardsOpacity(this);
      }
    }
  });

  function updateCardsOpacity(swiperInstance) {
    const slides = swiperInstance.slides;
    const isDesktop = window.innerWidth >= 1024;
    
    // Сначала всем карточкам устанавливаем прозрачность
    document.querySelectorAll('.news-card').forEach(card => {
      card.classList.remove('active');
      card.style.opacity = '0.2';
    });

    // Активная карточка
    slides[swiperInstance.activeIndex].querySelector('.news-card').classList.add('active');
    slides[swiperInstance.activeIndex].querySelector('.news-card').style.opacity = '1';

    // В десктопном режиме активируем и следующую карточку
    if (isDesktop) {
      const nextSlideIndex = swiperInstance.activeIndex + 1;
      if (nextSlideIndex < slides.length) {
        slides[nextSlideIndex].querySelector('.news-card').classList.add('active');
        slides[nextSlideIndex].querySelector('.news-card').style.opacity = '1';
      }
    }
  }
});

function normalizeCardsHeight() {
  const cards = document.querySelectorAll('.card');
  let maxHeight = 0;
  
  // Сброс высоты
  cards.forEach(card => card.style.height = 'auto');
  
  // Находим максимальную высоту
  cards.forEach(card => {
    maxHeight = Math.max(maxHeight, card.offsetHeight);
  });
  
  // Устанавливаем единую высоту
  cards.forEach(card => {
    card.style.height = `${maxHeight}px`;
  });
}

// Вызов функций
window.addEventListener('load', normalizeCardsHeight);
window.addEventListener('resize', normalizeCardsHeight);

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.intro .slide');
  const sliderContainer = document.querySelector('.intro__image');
  const timerLine = document.querySelector('.timer-line');
  let currentIndex = 0;
  const slideDuration = 8000;
  let slideInterval;
  let isSliderActive = false;

  // Стили для разных состояний
  const inactiveStyles = {
    filter: 'grayscale(1) contrast(0.8)',
    opacity: '0.3',
    transition: 'all 0.5s ease'
  };

  const activeStyles = {
    filter: 'none',
    opacity: '1',
    transition: 'all 0.5s ease'
  };

  // Наблюдатель за видимостью с порогом 50%
  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const isHalfVisible = entry.intersectionRatio >= 0.5;

      if (isHalfVisible && !isSliderActive) {
        // Активируем слайдер
        isSliderActive = true;
        Object.assign(sliderContainer.style, activeStyles);
        startSlider();
      } else if (!isHalfVisible && isSliderActive) {
        // Деактивируем слайдер
        isSliderActive = false;
        Object.assign(sliderContainer.style, inactiveStyles);
        pauseSlider();
      }
    });
  }, { 
    threshold: [0, 0.5, 1] // Триггеры для 0%, 50% и 100% видимости
  });

  visibilityObserver.observe(sliderContainer);

  function showNextSlide() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
    restartTimer();
  }

  function restartTimer() {
    if (!timerLine) return;
    
    const timerAfter = timerLine.querySelector('::after');
    if (timerAfter) {
      timerAfter.style.animation = 'none';
      setTimeout(() => {
        timerAfter.style.animation = `timerProgress ${slideDuration/1000}s linear forwards`;
      }, 10);
    }
  }

  function startSlider() {
    if (!isSliderActive || slideInterval) return;
    slideInterval = setInterval(showNextSlide, slideDuration);
    restartTimer();
  }

  function pauseSlider() {
    clearInterval(slideInterval);
    slideInterval = null;
  }

  // Инициализация
  function initSlider() {
    // Применяем начальные стили
    Object.assign(sliderContainer.style, inactiveStyles);
    
    // Показываем первый слайд
    slides[currentIndex].classList.add('active');
    
    // Добавляем CSS для анимации
    const style = document.createElement('style');
    style.textContent = `
      @keyframes timerProgress {
        from { transform: scaleY(0); }
        to { transform: scaleY(1); }
      }
      .timer-line::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: inherit;
        transform: scaleY(0);
        transform-origin: top center;
      }
    `;
    document.head.appendChild(style);
  }

  initSlider();
});

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

document.documentElement.style.scrollBehavior = 'auto';
window.addEventListener('load', () => {
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const timerLine = document.querySelector('.timer-line');
  const totalTime = 8000; // 8 секунд на каждое изображение
  let currentIndex = 0;
  
  function startSlider() {
    setTimeout(() => {
      timerLine.style.transition = `height ${totalTime/1000}s linear`;
      timerLine.style.height = '100%';
    }, 10);
    
    setTimeout(() => {
      nextSlide();
    }, totalTime);
  }
  
  function nextSlide() {
    // Сбрасываем анимацию таймера
    timerLine.style.transition = 'none';  
    timerLine.style.height = '0';
    
    // Меняем слайд
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
    
   console.log('Текущий слайд до переключения:', currentIndex);

    // Перезапускаем таймер
    setTimeout(() => {
      timerLine.style.transition = `height ${totalTime/1000}s linear`;
      timerLine.style.height = '100%';
    }, 10);
    
    setTimeout(() => {
      nextSlide();
    }, totalTime);
  }
  
  // Начальный запуск
  startSlider();
});

document.querySelectorAll('picture').forEach(pic => {
  const img = pic.querySelector('img');
  const firstSource = pic.querySelector('source');
  
  firstSource.addEventListener('error', () => {
    img.style.display = 'block'; // Принудительно показываем <img>
  });
});