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
 * @property {Object} observer - The options for the Intersection Observer.
 * @property {Function} onLoaded - The callback to be executed when the media is loaded.
 * @property {Function} onLoading - The callback to be executed when the media is loading.
 * @property {Function} onError - The callback to be executed when there is an error loading the media.
 */ var $e4e7a73bee6a4aee$export$2e2bcd8739ae039 = {
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
    onWaiting: ()=>{},
    onLoaded: ()=>{},
    onLoading: ()=>{},
    onError: ()=>{}
};


/**
 * Set attributes on the given HTML element based on the provided options.
 *
 * @module assetLoader
 *
 * @param {HTMLElement} element - The HTML element to set attributes on.
 * @param {Object} options - Options for attribute names.
 */ var $55aebfb21ba6071b$export$2e2bcd8739ae039 = (element, options)=>{
    const attributes = Object.entries(options.attrs);
    const loadAttr = ([attr, lazyAttr])=>{
        const assetPath = element.getAttribute(lazyAttr);
        if (assetPath) element.setAttribute(attr, assetPath);
    };
    attributes.forEach(loadAttr);
};


/**
 * Default settings for the lazy loading functionality.
 *
 * @module settings
 *
 * @property {string} stateAttr - The attribute to store the state of the lazy loading process.
 * @property {Array} supportedElements - The types of elements that are supported for lazy loading.
 * @property {Object} states - The possible states of the lazy loading process.
 */ var $2e06dbd9a7176757$export$2e2bcd8739ae039 = {
    stateAttr: "lazy-state",
    supportedElements: [
        "img",
        "video",
        "embed",
        "object",
        "iframe",
        "audio"
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
 * @property {function} setWaitingState - Function handling waiting state operations.
 * @property {function} setLoadingState - Function handling loading state operations.
 * @property {function} setLoadedState - Function handling loaded state operations.
 * @property {function} setErrorState - Function handling error state operations.
 */ $be4bb12be4dd9f4e$export$2e2bcd8739ae039 = {
    setWaiting: (element, options)=>{
        element.setAttribute((0, $2e06dbd9a7176757$export$2e2bcd8739ae039).stateAttr, (0, $2e06dbd9a7176757$export$2e2bcd8739ae039).states.waiting);
        options.onWaiting(element);
    },
    setLoading: (element, options)=>{
        element.setAttribute((0, $2e06dbd9a7176757$export$2e2bcd8739ae039).stateAttr, (0, $2e06dbd9a7176757$export$2e2bcd8739ae039).states.loading);
        options.onLoading(element);
    },
    setLoaded: (element, options)=>{
        const assetAttr = Object.entries(options.attrs);
        element.setAttribute((0, $2e06dbd9a7176757$export$2e2bcd8739ae039).stateAttr, (0, $2e06dbd9a7176757$export$2e2bcd8739ae039).states.loaded);
        assetAttr.forEach(([attr, lazyAttr])=>element.removeAttribute(lazyAttr));
        options.onLoaded(element);
    },
    setError: (element, options, error)=>{
        console.warn("Error on:", element, error);
        element.setAttribute((0, $2e06dbd9a7176757$export$2e2bcd8739ae039).stateAttr, (0, $2e06dbd9a7176757$export$2e2bcd8739ae039).states.error);
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
 */ $67c2ab11c12b7b4c$export$2e2bcd8739ae039 = (element)=>{
    const elementType = element.tagName.toLowerCase();
    const isSupported = (0, $2e06dbd9a7176757$export$2e2bcd8739ae039).supportedElements.includes(elementType);
    if (!isSupported) throw new Error(`${elementType} Element is not supported!`);
    return true;
};


/**
 * Creates an Intersection Observer and starts observing the given item.
 *
 * @module observer
 *
 * @param {Element} item - The DOM element to be observed.
 * @param {Function} callback - The function to be called when the item is intersecting.
 * @param {Object} settings - The options for the Intersection Observer.
 */ var $afbda835b72f3fa2$export$2e2bcd8739ae039 = (item, callback, settings)=>{
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
 */ var $286db38838bca09d$export$2e2bcd8739ae039 = (selector)=>{
    if (selector instanceof Element) return [
        selector
    ];
    if (selector instanceof NodeList) return selector;
    if (selector instanceof Array) return selector;
    const elements = document.querySelectorAll(selector);
    if (!elements.length) throw new Error("No lazy loadable element found!");
    return elements;
};


var $3e2aed16982f049f$export$2e2bcd8739ae039 = (selector, customOptions = {})=>{
    const options = {
        ...(0, $e4e7a73bee6a4aee$export$2e2bcd8739ae039),
        ...customOptions
    };
    const handleLoading = (target)=>{
        const handleLoad = ()=>{
            (0, $be4bb12be4dd9f4e$export$2e2bcd8739ae039).setLoaded(target, options);
        };
        const handleError = ()=>{
            (0, $be4bb12be4dd9f4e$export$2e2bcd8739ae039).setError(target, options, "Loading media.");
        };
        (0, $be4bb12be4dd9f4e$export$2e2bcd8739ae039).setLoading(target, options);
        (0, $55aebfb21ba6071b$export$2e2bcd8739ae039)(target, options);
        target.addEventListener("load", handleLoad, {
            once: true
        });
        target.addEventListener("error", handleError, {
            once: true
        });
    };
    const processLazyItem = (item)=>{
        try {
            (0, $67c2ab11c12b7b4c$export$2e2bcd8739ae039)(item);
            (0, $be4bb12be4dd9f4e$export$2e2bcd8739ae039).setWaiting(item, options);
            (0, $afbda835b72f3fa2$export$2e2bcd8739ae039)(item, handleLoading, options.observer);
        } catch (error) {
            (0, $be4bb12be4dd9f4e$export$2e2bcd8739ae039).setError(item, options, error.message);
        }
    };
    try {
        const lazyItems = (0, $286db38838bca09d$export$2e2bcd8739ae039)(selector);
        lazyItems.forEach(processLazyItem);
    } catch (error) {
        console.error("Lazy error:", error.message);
    }
};


export {$3e2aed16982f049f$export$2e2bcd8739ae039 as default};
