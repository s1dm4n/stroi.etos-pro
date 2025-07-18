document.querySelectorAll('.accordion__collaps-header').forEach(button => {
  button.addEventListener('click', function() {
    const content = this.closest('.accordion__collaps-wrapper');
    const container = this.nextElementSibling;
    const icon =  this.querySelector('.accordion__icon');

    container.classList.toggle('open');
    icon.classList.toggle('rotated',container.classList.contains('open'));
    content.classList.toggle('open',container.classList.contains('open'));
    container.style.height = container.scrollHeight + 'px';
  });
});