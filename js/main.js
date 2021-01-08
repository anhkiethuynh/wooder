//* Get Elements

const btnMenu = document.getElementById("btnMenu");
const nav = document.querySelector(".nav");
const langOption = document.querySelector(".language__option");
const currentLang = document.querySelector(".language__current");
const body = document.getElementsByTagName("body")[0];

//? Navigation on tablet & mobile
btnMenu.addEventListener("click", () => {
	btnMenu.classList.toggle("clicked");
	$("header").removeClass("hide");
	nav.classList.toggle("active");
	if (nav.classList.contains("active")) {
		document.body.style.overflowY = "hidden";
	} else {
		document.body.style.overflowY = "initial";
	}
});

//? Language Options

body.addEventListener("click", () => {
	langOption.classList.remove("active");
});
currentLang.addEventListener("click", (e) => {
	e.stopPropagation();
	langOption.classList.toggle("active");
});
const lang = document.querySelectorAll(".language__option a");
$(lang).each((e, i) => {
	$(e).on("click", (e) => {
		e.preventDefault();
		lang[i].classList.toggle("active");
		lang.forEach((e, j) => {
			if (i != j && e.classList.contains("active")) {
				e.classList.remove("active");
			}
		});
		currentLang.querySelector("span").innerText = lang[i].innerText;
	});
});

//? BACKTOTOP

let btnBackToTop = document.querySelector("#btnToTop");

function scrollTo(offsetHeight) {
	window.scrollBy({
		//get top body
		top: offsetHeight,
		behavior: "smooth",
	});
}
document.querySelector(".back-to-top").addEventListener("click", (e) => {
	e.preventDefault();
	scrollTo(-document.body.offsetHeight);
});
btnBackToTop.addEventListener("click", (e) => {
	e.preventDefault();
	scrollTo(-document.body.offsetHeight);
});
let windowHeight = $(window).height();
let footerOffsetTop = $("footer").offset().top;
console.log(footerOffsetTop);
window.addEventListener("scroll", () => {
	//get scroll height
	let offsetY = document.querySelector("html").scrollTop;
	// console.log()

	if (
		offsetY < $(".slider").height() / 2 ||
		offsetY + windowHeight - $("footer").height() >= footerOffsetTop
	) {
		// console.log(true)
		$(btnBackToTop).removeClass("show");
	} else {
		$(btnBackToTop).addClass("show");
	}
});
scrollTo(-document.body.offsetHeight);
window.addEventListener("scroll", () => {
	let sliderHeight = document.querySelector(".slider").offsetHeight;
	let header = document.querySelector("header");
	// console.warn(sliderHeight, navHeight)
	if (
		document.querySelector("html").scrollTop >
		sliderHeight - header.offsetHeight + 1
	) {
		header.style.background = "rgb(0 0 0 / 95%)";
	} else {
		header.style.background = "transparent";
	}
});

var doc = document.documentElement;
var w = window;

var prevScroll = w.scrollY || doc.scrollTop;
var curScroll;
var direction = 0;
var prevDirection = 0;

window.addEventListener("scroll", () => {
	if ($("window").width() > 786) {
		curScroll = w.scrollY || doc.scrollTop;
		if (curScroll > prevScroll) {
			direction = 2;
		} else {
			direction = 1;
		}

		if (direction !== prevDirection) {
			console.log(true);
			if (direction === 2 && curScroll > 100) {
				document.querySelector("header").classList.add("hide");
				prevDirection = direction;
			} else if (direction === 1) {
				console.log(false);
				document.querySelector("header").classList.remove("hide");
				prevDirection = direction;
			}
		}
		prevScroll = curScroll;
	}
});
//video popup

let $popUp = document.querySelector(".pop-up");

document.querySelectorAll(".thumbnail").forEach((element) => {
	element.addEventListener("click", () => {
		let src = "https://www.youtube.com/embed/";
		let key = element.getAttribute("data-source-key");
		document.querySelector("iframe").src = src + key;
		$popUp.style.display = "flex";
		body.style.overflowY = "hidden";
	});
});
document.querySelector(".pop-up .close").addEventListener("click", () => {
	$popUp.style.display = "none";
	document.querySelector("iframe").src = "";
	body.style.overflowY = "initial";
});

// SLIDER

imgList = [
	{
		id: 0,
		content: "bedroom",
		src: "https://images6.alphacoders.com/976/thumb-1920-976330.jpg",
	},
	{
		id: 1,
		content: "wooder",
		src: "img/slider.jpg",
	},
	{
		id: 2,
		content: "LVRoom",
		src:
			"http://cdn.home-designing.com/wp-content/uploads/2018/04/Taupe-sofa.jpg",
	},
	{
		id: 3,
		content: "bedroom2",
		src:
			"http://cdn.home-designing.com/wp-content/uploads/2016/09/dark-bedroom-inspiration.jpg",
	},
];

let $sliderSrc = document.querySelector(".slider .slider__item-image");
let $sliderTitle = document.querySelector(".slider .title");
let $imgCount = document.querySelector(".slider__bottom-paging .number");
let $dotList = document.querySelectorAll(".dotted ul li");
let count = 0;

function sliderSwap(count) {
	$sliderSrc.setAttribute("src", imgList[count].src);
	$sliderTitle.textContent = imgList[count].content;
	$imgCount.innerText = (imgList[count].id + 1).toString().padStart(2, "0");
	$dotList[count].classList.add("active");
}
$(window).ready(function () {
	let menu = imgList.map((item) => {
		// console.log(item)
		return `<div class="slider__item carousel-cell">
            <img class="slider__item-image" src="${item.src}" alt="">
            <div class="slider__item-text">
                <h2 class="title">${item.content}</h2>
                <a href="#" class="btn --button-main">
                    <span>Learn more</span>
                    <img src="img/right-arrow.png" alt="">
                </a>
            </div>
        </div>`;
	});

	menu = menu.join("");
	$(".main-carousel").html(menu);
	let check = true;
	imgList.forEach((item) => {
		if (check) {
			$(".dotted ul").append("<li class = 'active'></li>");
			check = false;
		} else $(".dotted ul").append("<li></li>");
	});
	var carousel = $(".main-carousel").flickity(
		//option
		{
			cellAlign: "left",
			contain: true,
			draggable: true,
			// wrapAround: true,
			// autoPlay: 1500,
			pauseAutoPlayOnHover: true,
			fullScreen: true,
			lazyload: 1,
			prevNextButtons: false,
			pageDots: false,
		}
	);
	$(".--next").on("click", () => {
		carousel.flickity("next", true);
	});
	$(".--prev").on("click", () => {
		carousel.flickity("previous", true);
	});

	$(".dotted ul li").each((i, e) => {
		$(e).on("click", () => {
			carousel.flickity("select", i);
			$(e).siblings().removeClass("active");
			$(e).addClass("active");
		});
	});
	carousel.on("change.flickity", (e, i) => {
		$(".number").text((i + 1).toString().padStart(2, "0"));
		$($(".dotted ul li")[i]).siblings().removeClass("active");
		$($(".dotted ul li")[i]).addClass("active");
	});
});

// document.querySelectorAll('.slider__bottom-controll div').forEach((e) => {
//     e.addEventListener("click", (e) =>{
//         let tmp = e.currentTarget.classList
//         $dotList[count].classList.remove('active')
//         if(tmp.contains('--prev')){
//            count--
//            if(count < 0)
//            {
//                count = imgList.length - 1
//            }
//         }
//         else{
//             count++
//             if(count > imgList.length - 1){
//                 count = 0
//             }
//         }
//         sliderSwap(count)
//     })
// })
// $dotList.forEach((e, i) =>{
//     e.addEventListener("click", (e) =>{
//         $dotList[count].classList.remove('active');
//         count = i;
//         sliderSwap(count);
//     })
// })

//CATCH ACTIVE MENU ELEMENT
//SCROLL to ACTIVE

let $menu = $("header .menu li");
let section = [];

$menu.each((i, e) => {
	let className = $(e).find("a").attr("data-section"); //.slider
	// console.log(tmp);
	let position = $(className).position().top; //top; left
	// console.log(height);
	section.push({ position: position, className: className });
});
// console.log(section)

$(window).scroll(() => {
	let offsetY = $("html").scrollTop();

	section.forEach((e) => {
		let heightSection = $(e.className).outerHeight();
		if (offsetY > e.position - 200 && offsetY < e.position + heightSection) {
			$menu.removeClass("active");
			let a = $menu.find(`a[data-section="${e.className}"]`);

			a.parent().addClass("active");
		}

		// if(offsetY > e.position -200 && offsetY < e.position + heightSection -200)
		// {
		//     $menu.removeClass('active')
		//     let a =   $menu.find(`a[data-section="${e.className}"]`)
		//     a.parent().addClass('active')
		// }
	});
});
// $menu.each((i, e) => {
//     $(e).click(() => {
//         let pos = $menu.find(`a[data-section="${e.position}"]`)
//         scrollTo(pos)
//     })
// })

$menu.on("click", function (e) {
	e.preventDefault();
	let tmp = $(this).find("a").attr("data-section");
	// console.log(tmp);
	// let position = $(tmp).offset().top
	$([document.documentElement, document.body]).animate(
		{
			scrollTop: $(tmp).offset().top - $("header").height() - 20,
		},
		500
	);
});
$("header .nav ul li").on("click", function (e) {
	e.preventDefault();
	let tmp = $(this).find("a").attr("data-section");

	$([document.documentElement, document.body]).animate(
		{
			scrollTop: $(tmp).offset().top - $("header").height() - 10,
		},
		500
	);

	$(".toggle").removeClass("clicked");
	$(".nav").removeClass("active");
	$("body").css("overflow-y", "auto");
	$("header").removeClass("hide");
});
var initPhotoSwipeFromDOM = function (gallerySelector) {
	var parseThumbnailElements = function (el) {
		var thumbElements = el.childNodes,
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl,
			size,
			item;
		for (var i = 0; i < numNodes; i++) {
			figureEl = thumbElements[i]; // <figure> element
			if (figureEl.nodeType !== 1) {
				continue;
			}
			linkEl = figureEl.children[0]; // <a> element
			size = linkEl.getAttribute("data-size").split("x");
			item = {
				src: linkEl.getAttribute("href"),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10),
			};
			if (figureEl.children.length > 1) {
				item.title = figureEl.children[1].innerHTML;
			}
			if (linkEl.children.length > 0) {
				// <img> thumbnail element, retrieving thumbnail url
				item.msrc = linkEl.children[0].getAttribute("src");
			}
			item.el = figureEl; // save link to element for getThumbBoundsFn
			items.push(item);
		}
		return items;
	};
	var closest = function closest(el, fn) {
		return el && (fn(el) ? el : closest(el.parentNode, fn));
	};
	var onThumbnailsClick = function (e) {
		e = e || window.event;
		e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		var eTarget = e.target || e.srcElement;
		var clickedListItem = closest(eTarget, function (el) {
			return el.tagName && el.tagName.toUpperCase() === "FIGURE";
		});
		if (!clickedListItem) {
			return;
		}
		var clickedGallery = clickedListItem.parentNode,
			childNodes = clickedListItem.parentNode.childNodes,
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index;
		for (var i = 0; i < numChildNodes; i++) {
			if (childNodes[i].nodeType !== 1) {
				continue;
			}
			if (childNodes[i] === clickedListItem) {
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}
		if (index >= 0) {
			openPhotoSwipe(index, clickedGallery);
		}
		return false;
	};
	var photoswipeParseHash = function () {
		var hash = window.location.hash.substring(1),
			params = {};
		if (hash.length < 5) {
			return params;
		}
		var vars = hash.split("&");
		for (var i = 0; i < vars.length; i++) {
			if (!vars[i]) {
				continue;
			}
			var pair = vars[i].split("=");
			if (pair.length < 2) {
				continue;
			}
			params[pair[0]] = pair[1];
		}
		if (params.gid) {
			params.gid = parseInt(params.gid, 10);
		}
		return params;
	};
	var openPhotoSwipe = function (
		index,
		galleryElement,
		disableAnimation,
		fromURL
	) {
		var pswpElement = document.querySelectorAll(".pswp")[0],
			gallery,
			options,
			items;
		items = parseThumbnailElements(galleryElement);
		options = {
			galleryUID: galleryElement.getAttribute("data-pswp-uid"),
			getThumbBoundsFn: function (index) {
				var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
					pageYScroll =
						window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect();

				return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
			},
			showAnimationDuration: 0,
			hideAnimationDuration: 0,
		};
		if (fromURL) {
			if (options.galleryPIDs) {
				for (var j = 0; j < items.length; j++) {
					if (items[j].pid == index) {
						options.index = j;
						break;
					}
				}
			} else {
				options.index = parseInt(index, 10) - 1;
			}
		} else {
			options.index = parseInt(index, 10);
		}
		if (isNaN(options.index)) {
			return;
		}
		if (disableAnimation) {
			options.showAnimationDuration = 0;
		}
		gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	};
	var galleryElements = document.querySelectorAll(gallerySelector);
	for (var i = 0, l = galleryElements.length; i < l; i++) {
		galleryElements[i].setAttribute("data-pswp-uid", i + 1);
		galleryElements[i].onclick = onThumbnailsClick;
	}
	var hashData = photoswipeParseHash();
	if (hashData.pid && hashData.gid) {
		openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
	}
};

$(window).load(function () {
	initPhotoSwipeFromDOM(".carousel-img");
	$popUp.style.display = "none";
});

$(window).load(function () {
	$(".svg").svgToInline();

	$(".carousel.carousel-img").flickity({
		cellAlign: "left",
		contain: true,
		prevNextButtons: false,
		draggable: true,
		freeScroll: true,
	});
});
