const images = document.querySelectorALL("[img-src]");

function preloadImage(img) {
	const src = img.getAttribute("img-src");
	if(!src) {
		return;
	}
	
	img.src = src;
}


const imgOptions = {
	threshold: 1,
	rootmargin: "0px 0px 300px 0px"	
}

const imgObserver = new IntersectionObserver((entries,
imgObserver) => {
	entries.forEach(entry => {
		if (!entry.isIntersecting) {
			return;
		} else {
			preloadImage(entry.target);
			imgObserver.unobserve(entry.target);
		}
	});
}, imgOptions);


images.forEach(image => {
	imgObserver.observe(image);
});


	