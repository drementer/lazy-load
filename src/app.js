/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */

import defaultOptions from './utils/defaultOptions.js';
import loadAsset from './helpers/assetLoader.js';
import states from './helpers/states.js';
import checkSupport from './helpers/checkSupport.js';
import observer from './helpers/observer.js';
import getElements from './helpers/getElements.js';

export default (selector, customOptions = {}) => {
  const options = { ...defaultOptions, ...customOptions };

  const observerCallback = (target) => {
    states.setLoading(target, options);
    loadAsset(target, options);
  };

  const processLazyItem = (item) => {
    try {
      states.setWaiting(item, options);

      checkSupport(item);
      observer(item, observerCallback, options.observer);
    } catch (error) {
      states.setError(item, options, error.message);
    }
  };

  try {
    const lazyItems = getElements(selector);

    lazyItems.forEach(processLazyItem);
  } catch (error) {
    console.error('Lazy error:', error.message);
  }
};
