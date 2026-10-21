/* Theseus homepage: scroll reveal, nav background past the cover, theme toggle. */

(function () {
    'use strict';

    var root = document.documentElement;

    /* ------------------------------------------------ scroll reveal */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, i * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(function (el) { observer.observe(el); });
    }
    // never leave text hidden, whatever the observer does
    setTimeout(function () {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }, 3000);

    /* ------------------------------------------------ nav background once past the cover */
    var nav = document.querySelector('.nav-bar');
    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 80);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ------------------------------------------------ theme */
    var btn = document.getElementById('theme');
    var mq = window.matchMedia('(prefers-color-scheme: dark)');

    function current() {
        return root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');
    }

    function label() {
        btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }

    btn.addEventListener('click', function () {
        var next = current() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try {
            localStorage.setItem('th-theme', next);
        } catch (e) {}
        label();
    });
    label();
})();
