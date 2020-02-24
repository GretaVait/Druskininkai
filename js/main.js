// ------------------------------------------------------
// ------------------- Functions ------------------------
// ------------------------------------------------------
function toggleDropdown(activeDropdown, inactiveDropdown1, inactiveDropdown2, inactiveLink1, inactiveLink2) {
    activeDropdown.classList.toggle('dropdown--active');
    inactiveDropdown1.classList.remove('dropdown--active');
    inactiveDropdown2.classList.remove('dropdown--active');
    inactiveLink1.classList.remove('open');
    inactiveLink2.classList.remove('open');
}

// ------------------------------------------------------
// ------------------- Event Listeners ------------------
// ------------------------------------------------------
const fixed = document.querySelector('.fixed');

// --------------- Event Listener load ------------------
let introCover = document.querySelector('.intro__cover');
window.addEventListener('load', () => {
    //store users selection (font size bigger or smaller)
    fontBigger = JSON.parse(localStorage.getItem('fontBiggerLocal'));
    if (fontBigger) {
        html.classList.add('bigger-font-size');
    }
    if (window.pageYOffset > introCover.offsetHeight) {
        fixed.style.top = 750 + introCover.offsetHeight + 'px';
    }
});

// --------------- Event Listener scroll -----------------
window.addEventListener('scroll', () => {
    //adds top positioning for the "uncover" effect
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
    introImage.style.transform = `scale3d(${1 + (scrollPosition/3000)}, ${1 + (scrollPosition/3000)}, 1)`;
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

// ----------------- Dropdown menu ---------------------
const navLink = document.querySelectorAll('.nav__link');
const dropdownMenu = document.querySelectorAll('.dropdown--menu');
console.log(window.innerWidth);

for (let i = 0; i < navLink.length; i++) {
    navLink[i].addEventListener('click', () => {
        if (window.innerWidth >= 1350) {
            if (navLink[i].classList.contains('dropdown')) {
                navLink[i].classList.toggle('open');
                if (navLink[i].innerHTML === "Ką veikti") {
                    toggleDropdown(dropdownMenu[0], dropdownMenu[1], dropdownMenu[2], navLink[1], navLink[2]);
                }
                if (navLink[i].innerHTML === "Apgyvendinimas") {
                    toggleDropdown(dropdownMenu[1], dropdownMenu[2], dropdownMenu[0], navLink[0], navLink[2]);
                }
                if (navLink[i].innerHTML === "Maitinimas") {
                    toggleDropdown(dropdownMenu[2], dropdownMenu[1], dropdownMenu[0], navLink[0], navLink[1]);
                }
            }
        }
    });
}

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
let html = document.querySelector('html');
let fontBigger = false;

//when accessability button clicked increase/decrease font size
btnAccess.addEventListener('click', () => {
    if (!fontBigger) {
        btnAccessBigger.style.color = '#D88B6C';
        btnAccessSmaller.style.color = '#D88B6C';

        html.classList.add('bigger-font-size');
        fontBigger = true;
    } else {
        btnAccessBigger.style.color = '#2B2B2B';
        btnAccessSmaller.style.color = '#2B2B2B';

        html.classList.remove('bigger-font-size');
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
        for (let j = 0; j < newsItem.length; j++) {
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
        $('.categories__item--link.naujienos').css("color", "#D88B6C");
        $('.categories__item--link.renginiai').css("color", "#2B2B2B");
        $('.categories__item--link.tinklarastis').css("color", "#2B2B2B");
        return $(this).hasClass("naujienos");
    });
    $('.slider__count--secondary').text(Math.ceil($('.slick-slide').length / 3));
});

$('.categories__item--link.renginiai').on('click', function() {
    $('.news__list').slick('slickUnfilter');
    $('.news__list').slick('slickFilter', function() {
        $('.categories__item--link.renginiai').css("color", "#D88B6C");
        $('.categories__item--link.naujienos').css("color", "#2B2B2B");
        $('.categories__item--link.tinklarastis').css("color", "#2B2B2B");
        return $(this).hasClass("renginiai");
    });
    $('.slider__count--secondary').text(Math.ceil($('.slick-slide').length / 3));
});

$('.categories__item--link.tinklarastis').on('click', function() {
    $('.news__list').slick('slickUnfilter');
    $('.news__list').slick('slickFilter', function() {
        $('.categories__item--link.tinklarastis').css("color", "#D88B6C");
        $('.categories__item--link.renginiai').css("color", "#2B2B2B");
        $('.categories__item--link.naujienos').css("color", "#2B2B2B");
        return $(this).hasClass("tinklarastis");
    });
    $('.slider__count--secondary').text(Math.ceil($('.slick-slide').length / 3));
});

// --------------- Show on which slide user is  --------------------
$('.news__list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    const counter = (nextSlide / 3) + 1;
    $('.slider__count--primary').text(counter);
});