// JavaScript (обновленный код)
document.addEventListener('DOMContentLoaded', function() {
  const headers = document.querySelectorAll('.accordion__collaps-header');
  const allWrappers = document.querySelectorAll('.accordion__collaps-wrapper');
  const allContents = document.querySelectorAll('.accordion__collaps-content');
  const allSlides = document.querySelectorAll('.accordion__slide');
  
  // Добавляем data-index для связи заголовков и слайдов
  headers.forEach((header, index) => {
    header.dataset.index = index;
  });

  // Открываем первый слайд по умолчанию
  if (allWrappers.length > 0) {
    allWrappers[0].classList.add('open');
    allContents[0].style.height = allContents[0].scrollHeight + 'px';
    allContents[0].style.opacity = '1';
    headers[0].querySelector('.accordion__icon').classList.add('rotated');
    allSlides[0].classList.add('active');
  }

  headers.forEach(button => {
    button.addEventListener('click', function() {
      const currentWrapper = this.closest('.accordion__collaps-wrapper');
      const currentContent = this.nextElementSibling;
      const currentIcon = this.querySelector('.accordion__icon');
      const slideIndex = parseInt(this.dataset.index);
      
      // Если кликнули на уже открытый слайд - ничего не делаем
      if (currentWrapper.classList.contains('open')) return;
      
      // Закрываем все слайды
      allWrappers.forEach(wrapper => wrapper.classList.remove('open'));
      allContents.forEach(content => {
        content.style.height = '0';
        content.style.opacity = '0';
      });
      headers.forEach(header => {
        header.querySelector('.accordion__icon').classList.remove('rotated');
      });
      allSlides.forEach(slide => slide.classList.remove('active'));
      
      // Открываем текущий слайд с анимацией
      currentWrapper.classList.add('open');
      currentIcon.classList.add('rotated');
      currentContent.style.height = currentContent.scrollHeight + 'px';
      currentContent.style.opacity = '1';
      allSlides[slideIndex].classList.add('active');
    });
  });
});