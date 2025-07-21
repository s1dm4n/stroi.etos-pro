document.addEventListener('DOMContentLoaded', function() {
  // Обрабатываем каждый аккордеон отдельно
  document.querySelectorAll('.accordion').forEach(accordion => {
    const headers = accordion.querySelectorAll('.accordion__collaps-header');
    const wrappers = accordion.querySelectorAll('.accordion__collaps-wrapper');
    const contents = accordion.querySelectorAll('.accordion__collaps-content');
    const slides = accordion.querySelectorAll('.accordion__slide');
    
    // Добавляем data-index для связи внутри текущего аккордеона
    headers.forEach((header, index) => {
      header.dataset.index = index;
    });

    // Открываем первый слайд в текущем аккордеоне
    if (wrappers.length > 0) {
      wrappers[0].classList.add('open');
      contents[0].style.height = contents[0].scrollHeight + 'px';
      contents[0].classList.add('open');
      headers[0].querySelector('.accordion__icon').classList.add('rotated');
      if (slides.length > 0) slides[0].classList.add('active');
    }

    // Обработчики для текущего аккордеона
    headers.forEach(button => {
      button.addEventListener('click', function() {
        const currentWrapper = this.closest('.accordion__collaps-wrapper');
        const currentContent = this.nextElementSibling;
        const currentIcon = this.querySelector('.accordion__icon');
        const slideIndex = parseInt(this.dataset.index);
        
        if (currentWrapper.classList.contains('open')) return;
        
        // Закрываем все слайды в текущем аккордеоне
        wrappers.forEach(wrapper => wrapper.classList.remove('open'));
        contents.forEach(content => {
          content.style.height = '0';
          content.classList.remove('open');
        });
        headers.forEach(header => {
          header.querySelector('.accordion__icon').classList.remove('rotated');
        });
        if (slides.length > 0) slides.forEach(slide => slide.classList.remove('active'));
        
        // Открываем текущий слайд
        currentWrapper.classList.add('open');
        currentIcon.classList.add('rotated');
        currentContent.style.height = currentContent.scrollHeight + 'px';
        currentContent.classList.add('open');
        if (slides.length > 0) slides[slideIndex].classList.add('active');
      });
    });
  });
});