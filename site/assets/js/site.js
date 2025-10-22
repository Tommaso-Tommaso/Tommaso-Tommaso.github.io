(function(){
  function onScroll(){
    if (window.scrollY > 4) {
      document.body.classList.add('is-scrolled');
    } else {
      document.body.classList.remove('is-scrolled');
    }
  }
  function initToggle(){
    var nav = document.querySelector('nav');
    var toggle = document.querySelector('.nav-toggle');
    if (!nav || !toggle) return;
    toggle.addEventListener('click', function(){
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  document.addEventListener('DOMContentLoaded', function(){
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    initToggle();
  });
})();
