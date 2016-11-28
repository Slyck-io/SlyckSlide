var slyckSlider = (function() {
	this.images = [];
	var nextBtn, prevBtn;
	var slide;
	var page = 0;
	var autoLoopTimeout;
	var pauseLoopTimeout;
	this.slideTime = 3000;
	this.waitTime = 10000; //10 second wait if you hit a button.
	
	var addButtons = function() {
		var root = document.querySelector('.slyckSlide');
		var btns = document.createElement("div");
		btns.classList.add('buttons');
		btns.innerHTML = '<a href="#" class="prev">' +
					'<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>' +
				 '</a>' +
				 '<a href="#" class="next">' +
					'<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>' +
				 '</a>';
		root.appendChild(btns);
		
		var pagination = document.createElement("div");
		pagination.id = 'pagination';

		root.appendChild(pagination);
	}

	//Main init function for slides
	var init = function(options) {
		if (options) { 
			if (options.slideTime) {
				this.slideTime = options.slideTime;
			}

			if (options.waitTime) {
				this.waitTime = options.waitTime;
			}

			if (options.images) {
				this.images = options.images;
			}
		}

		var root = document.querySelector('.slyckSlide');
		var photos = document.createElement("div");
		photos.classList.add("photos");
		root.appendChild(photos);

		for (var i = 0; i < this.images.length; i++) {
			var imageBlock = document.createElement('div');
			imageBlock.setAttribute('class', 'block');
			imageBlock.classList.add('slide');

			var img = document.createElement('img');
			img.setAttribute('src', this.images[i]);

			imageBlock.appendChild(img);
			photos.appendChild(imageBlock);
		}

		addButtons();

		nextBtn = document.querySelector('.slyckSlide .buttons .next');
		prevBtn = document.querySelector('.slyckSlide .buttons .prev');

		prevBtn.onclick = function() {
			prev();
			pauseLoop();
		}

		nextBtn.onclick = function() {
			next();
			pauseLoop();
		} 

		document.querySelectorAll('.photos .block')[0].classList.add("active");
		//To keep size proportionate
		var firstImage = document.querySelector('.slyckSlide .photos .slide img');
		firstImage.onload = function() {
			photos.style.height = firstImage.height + "px";
		}
		window.onresize = function() {
			photos.style.height = firstImage.height + "px";
		}
	
		photos.style.height = firstImage.height + "px";

		//Var set
		slide = document.querySelectorAll('.slyckSlide .photos .slide');

		//Pagination
		var paginator = document.getElementById('pagination');
		var pager = document.createElement('ul');
		var itemCount = slide.length;

		for (var i = 0; i < itemCount; i++) {
			var circle = document.createElement('li');
			circle.setAttribute('page-id', i);
			pager.appendChild(circle);
		}

		paginator.appendChild(pager);
		pager.setAttribute('class', 'pagination-items');
		pager.childNodes[0].classList.add('active');

		var circles = document.querySelectorAll('.slyckSlide #pagination li');
		
		for(var i = 0; i < circles.length; i++) {
			circles[i].onclick = function() {
				goToPage(this.getAttribute("page-id"));
			}
		}

		autoLoop();
	}

	var goToPage = function(id) {
		slide[page].classList.remove('active');
		page = id;
		slide[page].classList.add('active');
		updatePagination(page);
		pauseLoop();
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
		init: function(options) {
			init(options)
		},
		next: function() {
			next();
		},
		prev: function() {
			prev();
		}
	}
})();
