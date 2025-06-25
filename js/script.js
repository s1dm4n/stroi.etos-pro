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

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1, // По умолчанию 1 слайд
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // При ширине экрана >= 1024px
    1024: {
      slidesPerView: 2, // Показываем 2 слайда
      spaceBetween: 30
    }
  }
});