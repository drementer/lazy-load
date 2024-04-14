/**
 * Creates an Intersection Observer and starts observing the given item.
 *
 * @module observer
 *
 * @param {Element} item - The DOM element to be observed.
 * @param {Function} callback - The function to be called when the item is intersecting.
 * @param {Object} settings - The options for the Intersection Observer.
 */
export default (item, callback, settings) => {
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      callback(entry.target);
      observer.unobserve(entry.target);
    });
  };

  const observer = new IntersectionObserver(handleIntersection, settings);

  observer.observe(item);
};
