document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('navBurger');
    const menu = document.getElementById('mobileMenu');

    function updateScrollLock() {
        if (menu.classList.contains('active')) {
            if (window.innerWidth <= 1024) {
                document.body.style.overflow = 'hidden'; // Блокируем прокрутку на мобильном
            } else {
                document.body.style.overflow = ''; // Разрешаем прокрутку на планшете и выше
            }
        } else {
            document.body.style.overflow = ''; // Разрешаем в любом случае, если меню закрыто
        }
    }

    function closeMenu() {
        menu.classList.remove('active');
        burger.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Обработка изменения ширины окна
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && menu.classList.contains('active')) {
            closeMenu(); // Закрываем меню при переходе на десктоп
        } else {
            updateScrollLock(); // Синхронизируем скролл
        }
    });

     menu.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu__content')) {
            closeMenu();
        }
    });

    // Обработка клика по бургеру
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        menu.classList.toggle('active');
        updateScrollLock();
    });

    // Закрытие меню при клике по ссылке в мобильном меню
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            burger.classList.remove('open');
            document.body.style.overflow = ''; // или document.documentElement.classList.remove('lock-scroll');
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
      card.style.opacity = '0.4';
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

// Для Swiper
const swiper = new Swiper('.swiper-container', {
  on: {
    init: normalizeCardsHeight,
    slideChange: normalizeCardsHeight,
    resize: normalizeCardsHeight
  }
});