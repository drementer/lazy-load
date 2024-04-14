import lazyLoad from '/dist/lazy-load.js';

const initLazyLoad = () => lazyLoad('[lazy]');
window.addEventListener('load', initLazyLoad, { once: true });
