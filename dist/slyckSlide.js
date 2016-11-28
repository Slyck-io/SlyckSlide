var slyckSlider = (function() {
	this.images = [];
	var nextBtn = document.querySelector('.slyckSlide .buttons .next');
	var prevBtn = document.querySelector('.slyckSlide .buttons .prev');
	var slide;
	var page = 0;
	var autoLoopTimeout;
	var pauseLoopTimeout;
	this.slideTime = 3000;
	this.waitTime = 10000; //10 second wait if you hit a button.

	//Main init function for slides
	var init = function(images, options) {
		this.images = images;

		if (options) {
			if (options.slideTime) {
				this.slideTime = options.slideTime;
			}

			if (options.waitTime) {
				this.waitTime = options.waitTime;
			}
		}

		var photos = document.querySelector('.photos');

		for (var i = 0; i < this.images.length; i++) {
			var imageBlock = document.createElement('div');
			imageBlock.setAttribute('class', 'block');

			var img = document.createElement('img');
			img.setAttribute('src', this.images[i]);

			imageBlock.appendChild(img);
			photos.appendChild(imageBlock);
		}

		document.querySelectorAll('.photos .block')[0].classList.add("active");

		//To keep size proportionate
		var firstImage = document.querySelector('.slyckSlide .photos .block img');
		firstImage.onload = function() {
			photos.style.height = firstImage.height + "px";
		}
		window.onresize = function() {
			photos.style.height = firstImage.height + "px";
		}

		//Var set
		slide = document.querySelectorAll('.slyckSlide .photos .block');

		//Pagination
		var paginator = document.getElementById('pagination');
		var pager = document.createElement('ul');
		var itemCount = slide.length;

		for (var i = 0; i < itemCount; i++) {
			var circle = document.createElement('li');
			pager.appendChild(circle);
		}

		paginator.appendChild(pager);
		pager.setAttribute('class', 'pagination-items');
		pager.childNodes[0].classList.add('active');

		autoLoop();
	}

	var prev = function() {
		slide[page].classList.remove('active');
		page--;

		if (page < 0) {
			page = slide.length - 1;
		}
		slide[page].classList.add('active');
		updatePagination(page);
	}

	var next = function() {
		slide[page].classList.remove('active');
		page++;

		if (page >= slide.length) {
			page = 0;
		}

		slide[page].classList.add('active');
		updatePagination(page);
	}

	prevBtn.onclick = function() {
		prev();
		pauseLoop();
	}

	nextBtn.onclick = function() {
		next();
		pauseLoop();
	}

	var updatePagination = function(index) {
		var pages = document.querySelectorAll('#pagination .pagination-items li');
		var active = document.querySelector('#pagination .pagination-items li.active');

		active.className = "";
		pages[index].classList.add('active');
	}

	var autoLoop = function() {
		autoLoopTimeout = setTimeout(function() {
			next();
			autoLoop();
		}, this.slideTime);
	}

	var pauseLoop = function() {
		clearTimeout(pauseLoopTimeout);
		clearTimeout(autoLoopTimeout);

		pauseLoopTimeout = setTimeout(function() {
			next();
			autoLoop();
		}, this.waitTime);
	}

	return {
		init: function(images, options) {
			init(images, options)
		},
		next: function() {
			next();
		},
		prev: function() {
			prev();
		}
	}
})();
