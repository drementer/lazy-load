export default (image, state) => {
  return image.getAttribute('lazy-state') == state;
};
