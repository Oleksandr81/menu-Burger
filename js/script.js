"use strict"

//--------------------- Detect Mobile-----------------------------

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (
            isMobile.Android() || 
            isMobile.BlackBerry() || 
            isMobile.iOS() || 
            isMobile.Opera() || 
            isMobile.Windows());
    }
};

//---------Show-sub-menu-in-header---------------------------------------------

const menuSubList = document.querySelector('.menu__sub-list'),
      menuSubLink = document.querySelector('#sub__link'),
      menuNarrow = document.querySelector('.menu__arrow');

if (isMobile.any()) {
    document.body.classList.add('_touch');
        
    menuNarrow.addEventListener('click', () => {
        menuSubList.classList.toggle('menu__sub-list__show');
        menuNarrow.parentElement.classList.toggle('_active');
    });
} else {
    document.body.classList.add('_pc');
    
}

menuSubLink.addEventListener('mouseover', () => {
    if (!isMobile.any()) {
        menuSubList.classList.add('menu__sub-list__show');
    }
});

menuSubLink.addEventListener('mouseout', () => {
    if (!isMobile.any()) {
        menuSubList.classList.remove('menu__sub-list__show');
    }
});

//---------Show-burger-menu---------------------------------------------


const menuBurger = document.querySelector('.menu__icon'),
      menuBody = document.querySelector('.menu__body');

if (isMobile.any()) {
    menuBurger.addEventListener('click', openCloseMenuBurger);
}

function openCloseMenuBurger() {
    menuBody.classList.toggle('_active');
    menuBurger.classList.toggle('_active');
    document.body.classList.toggle('_lock');
}

//---------scroll-to-article-----------------------------------------------

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        e.preventDefault();
        const menuLink = e.target;

        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });

            openCloseMenuBurger();
        }
    }
}

// 

