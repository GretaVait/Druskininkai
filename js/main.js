// ------------------------------------------------------
// ------------------- Functions ------------------------
// ------------------------------------------------------

//increase font size by 2px
function fontSizeBig(fontTag) {
    for (let i = 0; i < fontTag.length; i++) {
        fontTag[i].style.fontSize = `${parseInt(window.getComputedStyle(fontTag[i]).fontSize) + 2}px`;
    }
}
//decrease font size by 2px
function fontSizeSmall(fontTag) {
    for (let i = 0; i < fontTag.length; i++) {
        fontTag[i].style.fontSize = `${parseInt(window.getComputedStyle(fontTag[i]).fontSize) - 2}px`;
    }
}
//sets font size bigger
function setFontBigger() {
    btnAccessBigger.style.color = '#D88B6C';
    btnAccessSmaller.style.color = '#D88B6C';

    fontSizeBig(h1);
    fontSizeBig(h2);
    fontSizeBig(h3);
    fontSizeBig(p);
    fontSizeBig(a);
    fontSizeBig(span);
    fontSizeBig(button);
    fontSizeBig(select);
}
//sets font size smaller
function setFontSmaller() {
    btnAccessBigger.style.color = '#2B2B2B';
    btnAccessSmaller.style.color = '#2B2B2B';

    fontSizeSmall(h1);
    fontSizeSmall(h2);
    fontSizeSmall(h3);
    fontSizeSmall(p);
    fontSizeSmall(a);
    fontSizeSmall(span);
    fontSizeSmall(button);
    fontSizeSmall(select);
}

// ------------------------------------------------------
// ------------------- Event Listeners ------------------
// ------------------------------------------------------
const fixed = document.querySelector('.fixed');

// --------------- Event Listener load ------------------
window.addEventListener('load', () => {
    fixed.style.width = (window.innerWidth - 17) + 'px';
    //store users selection (font size bigger or smaller)
    fontBigger = JSON.parse(localStorage.getItem('fontBiggerLocal'));
    if (fontBigger) {
        setFontBigger();
    }
});

window.addEventListener('resize', () => {
    fixed.style.width = (window.innerWidth - 17) + 'px';
});

// --------------- Event Listener scroll -----------------
window.addEventListener('scroll', () => {
    //adds top positioning for the "uncover" effect
    let introCover = document.querySelector('.intro__cover');
    if (window.pageYOffset <= introCover.offsetHeight) {
        if (window.innerWidth >= 1350) {
            fixed.style.top = (750 + window.pageYOffset) + 'px';
        } else if (window.innerWidth >= 768) {
            fixed.style.top = (600 + window.pageYOffset) + 'px';
        } else {
            fixed.style.top = (550 + window.pageYOffset) + 'px';
        }
    }

    //add intro background image effect to scale while scrolling
    let scrollPosition = window.pageYOffset;
    const introImage = document.querySelector('.intro__image');
    if (window.innerWidth >= 1350) {
        introImage.style.backgroundSize = 100 + (scrollPosition / 40) + '%';
    } else if (window.innerWidth >= 768) {
        introImage.style.backgroundSize = 200 + (scrollPosition / 40) + '%';
    } else {
        introImage.style.backgroundSize = 300 + (scrollPosition / 40) + '%';
    }
});

// -------------------- Menu --------------------------
const menu = document.querySelector('.menu');
const line = document.querySelectorAll('.line');
const nav = document.querySelector('nav');

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    nav.classList.toggle('nav--active');
    menu.style.pointerEvents = 'none';
    setTimeout(() => {
        menu.style.pointerEvents = 'auto';
    }, 500);
});

// --------------- Accessability -----------------------
//get all elements which font size will change
const h1 = document.querySelectorAll('h1');
const h2 = document.querySelectorAll('h2');
const h3 = document.querySelectorAll('h3');
const p = document.querySelectorAll('p');
const a = document.querySelectorAll('a');
const span = document.querySelectorAll('span');
const button = document.querySelectorAll('button');
const select = document.querySelectorAll('select');
//button accessability
const btnAccess = document.querySelector('.btn--accessability');
const btnAccessBigger = document.querySelector('.btn--accessability__bigger');
const btnAccessSmaller = document.querySelector('.btn--accessability__smaller');
//get fontBigger to false - font size is smaller
let fontBigger = false;

//when accessability button clicked increase/decrease font size
btnAccess.addEventListener('click', () => {
    if (!fontBigger) {
        setFontBigger();
        fontBigger = true;
    } else {
        setFontSmaller();
        fontBigger = false;
    }
    //store the value in local storage
    localStorage.setItem('fontBiggerLocal', fontBigger);
});

// --------------- Filter news section --------------------
//filter through selection and show only those who has the same category
const tag = document.querySelectorAll('.tag');
const newsItem = document.querySelectorAll('.news__item');

for (let i = 0; i < select.length; i++) {
    select[i].addEventListener('change', (event) => {
        console.log(event.target.value.toUpperCase());
        for (let j = 0; j < newsItem.length; j++) {
            console.log(tag[j].innerHTML.toUpperCase());
            if (event.target.value.toUpperCase() === tag[j].innerHTML.toUpperCase()) {
                newsItem[j].style.display = 'block';
            } else {
                newsItem[j].style.display = 'none';
            }
        }
    });
}

// --------------- Slick Carousel -------------------------
$(document).ready(function(){
    $('.news__list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: "unslick"
            }
        ]
    });
    //change arrows of slick carousel
    $('.left').click(function(){
        $('.news__list').slick('slickPrev');
      })
      
      $('.right').click(function(){
        $('.news__list').slick('slickNext');
    })
    //set counter how much slides there is
    $('.slider__count--secondary').text(Math.ceil($('.slick-slide').length / 3));
});

// --------------- Filter on slick carousel --------------------
$('.categories__item--link.naujienos').on('click', function() {
    $('.news__list').slick('slickUnfilter');
    $('.news__list').slick('slickFilter', function() {
      return $(this).hasClass("naujienos");
    });
    $('.slider__count--secondary').text(Math.ceil($('.slick-slide').length / 3));
});

$('.categories__item--link.renginiai').on('click', function() {
    $('.news__list').slick('slickUnfilter');
    $('.news__list').slick('slickFilter', function() {
      return $(this).hasClass("renginiai");
    });
    $('.slider__count--secondary').text(Math.ceil($('.slick-slide').length / 3));
});

$('.categories__item--link.tinklarastis').on('click', function() {
    $('.news__list').slick('slickUnfilter');
    $('.news__list').slick('slickFilter', function() {
      return $(this).hasClass("tinklarastis");
    });
    $('.slider__count--secondary').text(Math.ceil($('.slick-slide').length / 3));
});

// --------------- Show on which slide user is  --------------------
$('.news__list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    const counter = (nextSlide / 3) + 1;
    $('.slider__count--primary').text(counter);
});