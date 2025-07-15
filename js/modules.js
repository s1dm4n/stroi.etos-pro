document.querySelectorAll('.accordion__collaps-header').forEach(button => {
  button.addEventListener('click', function() {
    const content = this.closest('.accordion__collaps-wrapper');
    const container = this.closest('.accordion__collaps-wrapper');
    
    content.classList.toggle('open');
    container.style.opacity = '1';
  });
});