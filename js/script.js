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
  const sliderImage = document.querySelector('.intro__image');
  const slider = document.querySelector('.intro__slider');
  const slides = document.querySelectorAll('.intro__slide');
  const timerLine = document.querySelector('.intro__timer-line');
  const CENTER_THRESHOLD = 0.4;
  let currentIndex = 0;
  let timerAnimation = null;
  const slideDuration = 8000;
  let isSliderActive = false;
  let lastActiveTime = Date.now();

  // Проверка видимости слайдера
  function isSliderInView() {
    const rect = slider.getBoundingClientRect();
    const sliderCenter = rect.top + rect.height / 2;
    const screenCenter = window.innerHeight / 2;
    return Math.abs(sliderCenter - screenCenter) < window.innerHeight * CENTER_THRESHOLD;
  }

   // Управление состоянием слайдера
  function setSliderState(active) {
    if (active === isSliderActive) return;
    
    isSliderActive = active;
    const overlay = sliderImage.querySelector('::after') || 
                   document.createElement('div'); // Fallback
    
    if (active) {
      // Активация - убираем затемнение
      slider.style.filter = 'none';
      slider.style.opacity = '1';
      sliderImage.style.setProperty('--overlay-color', 'transparent');
      const elapsed = Date.now() - lastActiveTime;
      const remainingTime = Math.max(0, slideDuration - elapsed);
      startTimer(remainingTime);
    } else {
      // Деактивация - добавляем голубой оттенок
      slider.style.filter = 'grayscale(1)';
      slider.style.opacity = '0.7';
      sliderImage.style.setProperty('--overlay-color', 'rgba(38, 41, 49, 0.6)');
      pauseTimer();
      lastActiveTime = Date.now();
    }
  }

  // Запуск таймера с учетом оставшегося времени
  function startTimer(duration = slideDuration) {
    if (timerAnimation) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    
    timerLine.style.transition = 'none';
    timerLine.style.opacity = '1';
    timerLine.style.height = '0';
    
    requestAnimationFrame(() => {
      timerLine.style.transition = `height ${duration/1000}s linear`;
      timerLine.style.height = '100%';
      
      timerAnimation = setTimeout(() => {
        nextSlide();
      }, duration);
    });
  }

  // Пауза таймера
  function pauseTimer() {
    if (!timerAnimation) return;
    
    clearTimeout(timerAnimation);
    timerAnimation = null;
    
    // Сохраняем текущий прогресс
    const computedStyle = getComputedStyle(timerLine);
    const currentHeight = parseFloat(computedStyle.height);    
    timerLine.style.transition = 'opacity 0.4s';
    timerLine.style.height = `${currentHeight}px`;
    timerLine.style.opacity = '0';
  }

  // Переключение слайдов
  function nextSlide() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
    resetTimer();
  }

  // Сброс таймера
  function resetTimer() {
    if (timerAnimation) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    
    timerLine.style.transition = 'none';
    timerLine.style.height = '0';
    
    setTimeout(() => {
      if (isSliderActive) {
        startTimer();
      }
    }, 10);
  }

  // Обработчик видимости вкладки
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      pauseTimer();
      lastActiveTime = Date.now();
    } else if (isSliderActive) {
      const elapsed = Date.now() - lastActiveTime;
      const remainingTime = Math.max(0, slideDuration - elapsed);
      startTimer(remainingTime);
    }
  });

  // Проверка состояния
  function checkSliderState() {
    setSliderState(isSliderInView());
  }

  // Оптимизированный обработчик скролла
  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        checkSliderState();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Наблюдатель за видимостью
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        checkSliderState();
      }
    });
  }, { threshold: 0.4 });

  // Инициализация
  slides[0].classList.add('active');
  observer.observe(slider);
  checkSliderState();
});
document.addEventListener('DOMContentLoaded', function() {
  const videos = document.querySelectorAll('.lazy-video');
  let activeVideo = null;
  const CENTER_THRESHOLD = 0.4; // 40% от высоты видео должно быть в центре экрана

  // Ленивая загрузка видео
  const lazyVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const source = video.querySelector('source');

        if (source && !video.src) {
          video.src = source.dataset.src;
          video.load();
        }

        lazyVideoObserver.unobserve(video);
      }
    });
  }, { rootMargin: '200px' });

  videos.forEach(video => lazyVideoObserver.observe(video));

  // Функция для проверки, находится ли видео в центре экрана
  function isInCenter(video) {
    const rect = video.getBoundingClientRect();
    const videoCenter = rect.top + rect.height / 2;
    const screenCenter = window.innerHeight / 2;

    return Math.abs(videoCenter - screenCenter) < window.innerHeight * CENTER_THRESHOLD;
  }

  // Основная функция проверки видео
  function checkVideos() {
    let centerVideo = null;
    let minDistance = Infinity;

    // Находим видео, ближайшее к центру экрана
    videos.forEach(video => {
      const rect = video.getBoundingClientRect();
      const videoCenter = rect.top + rect.height / 2;
      const screenCenter = window.innerHeight / 2;
      const distance = Math.abs(videoCenter - screenCenter);

      if (distance < minDistance && isInCenter(video)) {
        minDistance = distance;
        centerVideo = video;
      }
    });

    // Если нашли новое видео в центре
    if (centerVideo && centerVideo !== activeVideo) {
      // Останавливаем текущее активное видео
      if (activeVideo) {
        activeVideo.pause();
        activeVideo.classList.remove('active');
      }

      // Запускаем новое видео
      centerVideo.play()
        .then(() => {
          centerVideo.classList.add('active');
          activeVideo = centerVideo;
        })
        .catch(error => {
          console.error('Ошибка воспроизведения видео:', error);
        });
    }

    // Если активное видео вышло из центра, но не найдено новое
    if (activeVideo && !isInCenter(activeVideo) && !centerVideo) {
      activeVideo.pause();
      activeVideo.classList.remove('active');
      activeVideo = null;
    }
  }

  // Оптимизированный обработчик скролла
  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        checkVideos();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Проверяем при загрузке страницы
  checkVideos();
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

document.querySelectorAll('picture').forEach(pic => {
  const img = pic.querySelector('img');
  const firstSource = pic.querySelector('source');
  
  firstSource.addEventListener('error', () => {
    img.style.display = 'block'; // Принудительно показываем <img>
  });
});