// To set lazyload images, change 'img src' to 'img data-src' on the selected images and add this js file to the page.
// Lazyload and intersection observer are currently not in use.

function loadImages(images) {
    images.forEach((image) => { // Loops through images
        const { src } = image.dataset; // Looks for src
        if (!src) return; // If there's no src returns;
        image.src = src; // If there is sets the src.
    });
}

(function() { // Self executing anonymous function to take out of the global scope

    const images = document.querySelectorAll("img"); // Grab all the img on the page

    if (!window.IntersectionObserver) {
        loadImages(images); // Pass in the images
        return; // Return once images are loaded
    }

    var intersectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry) => { // Loop for each entry, if the entry is not intersecting, does nothing
            if (!entry.isIntersecting) return;
            console.log("Loading Image"); // If the image is intersecting, log message to console, and unobserve that specific entry; so only fires on one image at one time
            intersectionObserver.unobserve(entry.target);
            const { src } = entry.target.dataset; // Swapped out the images we want to lazy load: From: 'img src' to 'img data-src'. All other images are loaded with page as normal
            if (!src) return; // end function if 
            entry.target.src = src; // set the 'img data-src' to 'img src'
        });
    });

    images.forEach((image) => { // For each img take this observer replace that element with image
        intersectionObserver.observe(image);
    });


})();