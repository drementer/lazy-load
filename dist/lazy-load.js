/**
 * Lazy-load.js
 *
 * @author drementer
 * @module lazyLoad
 * @version 1.0.7
 * @license MIT
 * @see {@link https://github.com/drementer/lazy-load.js}
 */ /**
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
 */ var $fcdb79bf76efe51c$export$2e2bcd8739ae039 = {
    attrs: {
        src: "lazy",
        srcset: "lazy-srcset",
        poster: "lazy-poster"
    },
    observer: {
        root: null,
        threshold: 1,
        rootMargin: "100% 0px"
    },
    onLoaded: ()=>{},
    onLoading: ()=>{},
    onError: (element, error)=>console.error("Error on:", element, error)
};


/**
 * Set attributes on the given HTML element based on the provided options.
 *
 * @module assetLoader
 *
 * @param {HTMLElement} element - The HTML element to set attributes on.
 * @param {Object} options - Options for attribute names.
 */ var $005d6bb149cc301b$export$2e2bcd8739ae039 = (element, options)=>{
    const attributes = Object.entries(options.attrs);
    const loadAttr = ([assetAttr, lazyAttr])=>{
        const assetPath = element.getAttribute(lazyAttr);
        if (assetPath) element.setAttribute(assetAttr, assetPath);
    };
    attributes.forEach(loadAttr);
};


/**
 * Default settings for the lazy loading functionality.
 *
 * @module settings
 *
 * @property {string} stateAttr - The attribute to store the state of the lazy loading process.
 * @property {Object} states - The possible states of the lazy loading process.
 * @property {string} states.waiting - The state when the element is waiting to be loaded.
 * @property {string} states.loading - The state when the element is currently loading.
 * @property {string} states.loaded - The state when the element has finished loading.
 * @property {string} states.error - The state when there was an error loading the element.
 * @property {Array.<string>} supportedElements - The types of elements that are supported for lazy loading.
 */ var $28fa4f35244940de$export$2e2bcd8739ae039 = {
    stateAttr: "lazy-state",
    supportedElements: [
        "img",
        "picture",
        "video",
        "embed",
        "object"
    ],
    states: {
        waiting: "waiting",
        loading: "loading",
        loaded: "loaded",
        error: "error"
    }
};


var /**
 * Object managing different states.
 *
 * @module states
 *
 * @property {function} loading - Function handling loading state operations.
 * @property {function} loaded - Function handling loaded state operations.
 * @property {function} error - Function handling error state operations.
 */ $fc4b3df073dcc3fa$export$2e2bcd8739ae039 = {
    waiting: (element)=>{
        element.setAttribute((0, $28fa4f35244940de$export$2e2bcd8739ae039).stateAttr, (0, $28fa4f35244940de$export$2e2bcd8739ae039).states.waiting);
    },
    loading: (element, options)=>{
        const handleLoad = ()=>{
            states.loaded(element, options);
        };
        const handleError = ()=>{
            states.error(element, options, "loading media.");
        };
        element.addEventListener("load", handleLoad, {
            once: true
        });
        element.addEventListener("error", handleError, {
            once: true
        });
        element.setAttribute((0, $28fa4f35244940de$export$2e2bcd8739ae039).stateAttr, (0, $28fa4f35244940de$export$2e2bcd8739ae039).states.loading);
        options.onLoading(element);
    },
    loaded: (element, options)=>{
        element.setAttribute((0, $28fa4f35244940de$export$2e2bcd8739ae039).stateAttr, (0, $28fa4f35244940de$export$2e2bcd8739ae039).states.loaded);
        element.removeAttribute(options.attrs.src);
        element.removeAttribute(options.attrs.srcset);
        element.removeAttribute(options.attrs.poster);
        options.onLoaded(element);
    },
    error: (element, options, error)=>{
        element.setAttribute((0, $28fa4f35244940de$export$2e2bcd8739ae039).stateAttr, (0, $28fa4f35244940de$export$2e2bcd8739ae039).states.error);
        options.onError(element, error);
    }
};



var /**
 * Checks if the given HTML element is of a supported type.
 *
 * @module checkSupport
 *
 * @param {HTMLElement} element - The HTML element to be checked.
 * @throws {Error} Throws an error if the element type is not supported.
 * @returns {boolean} Returns true if the element type is supported.
 */ $9eb20e71c19fcebc$export$2e2bcd8739ae039 = (element)=>{
    const elementType = element.tagName.toLowerCase();
    const isSupported = (0, $28fa4f35244940de$export$2e2bcd8739ae039).supportedElements.includes(elementType);
    if (isSupported) return true;
    throw new Error(`Element type ${elementType} is not supported!`);
};


/**
 * Creates an Intersection Observer and starts observing the given item.
 *
 * @module observer
 *
 * @param {Element} item - The DOM element to be observed.
 * @param {Function} callback - The function to be called when the item is intersecting.
 * @param {Object} settings - The options for the Intersection Observer.
 */ var $c9d82c8f03cb7648$export$2e2bcd8739ae039 = (item, callback, settings)=>{
    const handleIntersection = (entries, observer)=>{
        entries.forEach((entry)=>{
            if (!entry.isIntersecting) return;
            callback(entry.target);
            observer.unobserve(entry.target);
        });
    };
    const observer = new IntersectionObserver(handleIntersection, settings);
    observer.observe(item);
};


/**
 * Select elements based on a given selector within a specified root element.
 *
 * @module getElements
 *
 * @param {string | Element | NodeList | Array} selector - The selector to match elements.
 * @returns {NodeList} - The NodeList containing the selected elements.
 */ var $d7580633941bee6a$export$2e2bcd8739ae039 = (selector)=>{
    if (selector instanceof Element) return [
        selector
    ];
    if (selector instanceof NodeList) return selector;
    if (selector instanceof Array) return selector;
    return document.querySelectorAll(selector);
};


var $e05782b8f6baf6a3$export$2e2bcd8739ae039 = (selector, customOptions = {})=>{
    const options = {
        ...(0, $fcdb79bf76efe51c$export$2e2bcd8739ae039),
        ...customOptions
    };
    const observerCallback = (target)=>{
        (0, $fc4b3df073dcc3fa$export$2e2bcd8739ae039).loading(target, options);
        (0, $005d6bb149cc301b$export$2e2bcd8739ae039)(target, options);
    };
    const processLazyItem = (item)=>{
        try {
            (0, $fc4b3df073dcc3fa$export$2e2bcd8739ae039).waiting(item, options);
            (0, $9eb20e71c19fcebc$export$2e2bcd8739ae039)(item);
            (0, $c9d82c8f03cb7648$export$2e2bcd8739ae039)(item, observerCallback, options.observer);
        } catch (error) {
            (0, $fc4b3df073dcc3fa$export$2e2bcd8739ae039).error(item, options, error.message);
        }
    };
    try {
        const lazyItems = (0, $d7580633941bee6a$export$2e2bcd8739ae039)(selector);
        if (!lazyItems.length) throw new Error("No lazy loadable element found!");
        lazyItems.forEach(processLazyItem);
    } catch (error) {
        console.error("Lazy error:", error.message);
    }
};


export {$e05782b8f6baf6a3$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=lazy-load.js.map
