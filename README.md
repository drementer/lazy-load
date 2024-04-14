# Lazy Load Images

Lazy Load Images is a JavaScript utility that allows you to lazy load visual content when it approaches the visible area of the screen. This technique helps improve page loading speed by deferring the loading of images until they are actually needed.

## Usage

To use Lazy Load Images, include the `lazyLoad` function in your code. The function takes two optional parameters:

- `selector` (string, array, default: 'lazy'): CSS selector for lazy load items.
- `customOptions` (object): Options for the `lazyLoad`.

If no selector is provided, the default selector 'lazy' will be used.
If no observer options are provided, default options will be used.

```javascript
lazyLoad('lazy', {
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
  onLoaded: () => {},
  onLoading: () => {},
  onError: (element, error) => console.error('Error on:', element, error),
});
```

## License

[MIT License](https://choosealicense.com/licenses/mit/).
