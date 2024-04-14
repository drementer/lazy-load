/**
 * Default options for the lazy loading functionality.
 *
 * @module defaultOptions
 *
 * @property {Object} attrs - The attributes to be used for lazy loading.
 * @property {string} attrs.src - The attribute for the source of the media.
 * @property {string} attrs.srcset - The attribute for the source set of the media.
 * @property {string} attrs.poster - The attribute for the poster of the media.
 *
 * @property {Object} observer - The options for the Intersection Observer.
 * @property {Element} observer.root - The root element for the Intersection Observer.
 * @property {number} observer.threshold - The threshold for the Intersection Observer.
 * @property {string} observer.rootMargin - The root margin for the Intersection Observer.
 *
 * @property {Function} onLoaded - The callback to be executed when the media is loaded.
 * @property {Function} onLoading - The callback to be executed when the media is loading.
 * @property {Function} onError - The callback to be executed when there is an error loading the media.
 */
export default {
  attrs: {
    src: 'lazy',
    srcset: 'lazy-srcset',
    poster: 'lazy-poster',
  },
  observer: {
    root: null,
    threshold: 1,
    rootMargin: '100% 0px',
  },
  onWaiting: () => {},
  onLoaded: () => {},
  onLoading: () => {},
  onError: () => {},
};
