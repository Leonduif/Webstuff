$(document).ready(function() {

	function photoSlider(options) {
		var that = this;

		this.index = 0;

		// Gets container & images from the passed options object
		var $container       = $(options.container);
		var $sliderContainer = $container.find('.photo-slider__container');
		var images           = options.images;


		this.init = function() {
			addImages(1);
			addBullets();
			setWidth("items");
			setWidth("container");
			setActions();

			$(window).on("resize", function(){
				setWidth("items");
				setWidth("container");
				slidePhoto();
			});
		};

		function setActions() {
			var allImagesLoaded = false;

			// Touch device
			if (isTouch()) {
				touchEvents();
			}

			// Non-touch device
			else {
				clickEvents();
			}
		}

		function touchEvents() {
			$sliderContainer.hammer().bind("panstart panend panmove", function(e) {
				var $this = $(this); // .photo-slider__container

				// Reset transition
				$this.css('transition', 'none');

				var x = e.gesture.deltaX;

				// While moving
				if (e.type === "panmove") {
					var moveX = (-$this.find(".photo-slider__item").width() * (that.index) + x); // calculates the x coordinates based on what image is sliding
					$this.css('transform', 'translate3d(' + moveX + 'px, 0, 0)');
				}

				// Stop moving
				if (e.type === "panend") {
					$this.css('transition', '0.3s ease all');

					// Next image
					if (x < 50 && that.index < ($this.find(".photo-slider__item").length - 1)) {
						that.index++;
					}

					// Previous image
					else if (x > 50 && that.index > 0) {
						that.index--;
					}

					slidePhoto();


					// After the transition has ended, load the other images
					if (allImagesLoaded === false) {
						$container.append("<div class='photo-slider__spinner  loading-spinner'></div>");

						setTimeout(function(){
							addImages("all");
							setWidth("items");
							$container.find('.loading-spinner').remove();
						}, 500);
						allImagesLoaded = true;
					}
				}
			});
		}

		function clickEvents() {
			addButtons();

			$container.find(".photo-slider__nav-btn").on('click', function() {
				var $this = $(this); // .photo-slider__nav-btn

				// Next button
				if ($this.hasClass('photo-slider__nav-btn--next') && that.index < (images.length - 1)) {
					that.index++;
					slidePhoto();

					// Load other images once clicked (this will only run once)
					if (allImagesLoaded === false) {
						addImages("all");
						setWidth("items");
						allImagesLoaded = true;
					}
				}

				// Previous button
				else if (($this.hasClass('photo-slider__nav-btn--prev') && that.index > 0)) {
					that.index--;
					slidePhoto();
				}
			});
		}

		function slidePhoto() {
			// Calculates width and slides photo
			var itemWidth = $container.closest(".work-item").width() * that.index;

			$sliderContainer.css('transform', 'translate3d(-' + itemWidth + 'px, 0, 0)');

			// Disbles nav button if there are no more images that direction
			setButtonDisabled();

			// Sets bullet to active class
			setBulletActive();
		}

		function setBulletActive() {
			$container.find('.photo-slider__bullet').removeClass('photo-slider__bullet--active').eq(that.index).addClass('photo-slider__bullet--active');
		}

		function setButtonDisabled() {
			// Start of index
			if (that.index === 0) {
				$container.find(".photo-slider__nav-btn--prev").addClass('photo-slider__nav-btn--inactive');
			}

			// End of index
			else if (that.index === images.length - 1) {
				$container.find(".photo-slider__nav-btn--next").addClass('photo-slider__nav-btn--inactive');
			}

			// In between
			else {
				$container.find(".photo-slider__nav-btn").removeClass('photo-slider__nav-btn--inactive');
			}
		}

		function setWidth(el) {
			if (el === "container") {
				$sliderContainer.width($container.closest(".work-item").width() * images.length);
			}

			if (el === "items") {
				$container.find(".photo-slider__item").width($container.closest(".work-item").width());
			}
		}

		function addImages(imgCount) {
			var imgHtml = "";

			// Loops through all the images from the images array (starting from the 2nd since the first will always be rendered if js is disabled)
			if (imgCount === "all") {
				for (var i = 2; images.length > i; i++) {
					imgHtml += "<li class='photo-slider__item' style='background-image: url(" + images[i] + ");'></li>";
				}
			}
			else if (typeof imgCount === 'number' && imgCount > 0) {
				imgHtml = "<li class='photo-slider__item' style='background-image: url(" + images[1] + ");'></li>";
			}

			$sliderContainer.append(imgHtml);
		}

		function addBullets() {
			var bulletHtml = "";

			for (var i = 0; images.length > i; i++) {
				if (i === 0) {
					bulletHtml += "<li class='photo-slider__bullet  photo-slider__bullet--active'></li>";
				}
				else {
					bulletHtml += "<li class='photo-slider__bullet'></li>";
				}
			}

			$('<ul class="photo-slider__bullets"></ul>').insertAfter($sliderContainer).append(bulletHtml);
		}

		// Navigation buttons
		function addButtons() {
			$('<button class="photo-slider__nav-btn  photo-slider__nav-btn--prev  photo-slider__nav-btn--inactive"></button><button class="photo-slider__nav-btn  photo-slider__nav-btn--next"></button>').insertAfter($sliderContainer);
		}
	}

	var sliderIens = new photoSlider({
		"container": ".photo-slider--iens",
		images: ["assets/img/iens/iens-1.jpg", 
				"assets/img/iens/iens-2.jpg", 
				"assets/img/iens/iens-3.jpg", 
				"assets/img/iens/iens-4.jpg"]
	});

	var sliderJobado = new photoSlider({
		"container": ".photo-slider--jobado",
		images: ["assets/img/jobado/jobado-1.jpg",
				"assets/img/jobado/jobado-2.jpg",
				"assets/img/jobado/jobado-3.jpg"]
	});

	var sliderBabybytes = new photoSlider({
		"container": ".photo-slider--babybytes",
		images: ["assets/img/babybytes/babybytes-1.jpg",
				"assets/img/babybytes/babybytes-2.jpg",
				"assets/img/babybytes/babybytes-3.jpg",
				"assets/img/babybytes/babybytes-4.jpg"]
	});

	var sliderResidence = new photoSlider({
		"container": ".photo-slider--residence",
		images: ["assets/img/residence/residence-1.jpg",
				"assets/img/residence/residence-2.jpg",
				"assets/img/residence/residence-3.jpg"]
	});

	var sliderPoster = new photoSlider({
		"container": ".photo-slider--poster",
		images: ["assets/img/poster/poster-1.jpg",
				"assets/img/poster/poster-2.jpg",
				"assets/img/poster/poster-3.jpg",
				"assets/img/poster/poster-4.jpg"]
	});

	var sliderLogo = new photoSlider({
		"container": ".photo-slider--logo",
		images: ["assets/img/logo/logo-1.jpg",
				"assets/img/logo/logo-2.jpg",
				"assets/img/logo/logo-3.jpg"]
	});

	sliderIens.init();
	sliderJobado.init();
	sliderBabybytes.init();
	sliderResidence.init();
	sliderPoster.init();
	sliderLogo.init();
});