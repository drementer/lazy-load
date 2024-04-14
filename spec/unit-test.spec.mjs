import lazyLoad from '../dist/lazy-load.js';
import createImage from './helpers/createImage.mjs';
import checkState from './helpers/checkState.mjs';

const states = {
  waiting: 'waiting',
  loading: 'loading',
  loaded: 'loaded',
  error: 'error',
};

describe('Lazy Load Test', () => {
  beforeEach(function () {
    this.image = createImage('https://unsplash.it/400/400?gravity=center');
    lazyLoad(this.image);
  }, 1000);

  it('Was lazy load started?', function (done) {
    const isWaiting = checkState(this.image, states.waiting);

    expect(isWaiting).toBe(true);
    done();
  });

  it('Was image loaded?', function (done) {
    this.image.onload = () => {
      const isLoaded = checkState(this.image, states.loaded);

      expect(isLoaded).toBe(true);
      done();
    };
  });
});
