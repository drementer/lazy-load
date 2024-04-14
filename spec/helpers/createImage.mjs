export default (src) => {
  const image = new Image();
  image.setAttribute('lazy', `${src}?random=${Math.random()}`);

  return document.body.appendChild(image);
};
