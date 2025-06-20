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