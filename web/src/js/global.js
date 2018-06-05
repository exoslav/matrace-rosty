import $ from 'jquery';
import 'slick-carousel';
import styles from '../scss/main.scss'
import sstyles from 'slick-carousel/slick/slick.css';
import ssstyles from 'slick-carousel/slick/slick-theme.css';
import lightBoxStyles from 'lightBox2/src/css/lightbox.css';

import * as modals from './modals';
import loginForm from './login-form';

$('document').ready(() => {
	const mainNav = $('#main-nav > ul');
	const mmenuButton = $('.header-nav__open-mmenu');
	const openSearchButton = $('.header-nav__open-search');
	const searchBar = $('.header-toolbar__search');
	const openCategoryNav = $('.open-category-navigation');
	const categoryNav = $('#category-navigation > nav');

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

	mmenuButton.on('click', () => {
		if (mainNav.attr('data-open') === 'true') {
			mainNav.attr('data-open', 'false');
		} else {
			mainNav.attr('data-open', 'true');
		}
	})

	openSearchButton.on('click', () => {
		if (searchBar.attr('data-open') === 'true') {
			searchBar.attr('data-open', 'false')
		} else {
			searchBar.attr('data-open', 'true')
		}
	})

  openCategoryNav
    .on('click', function() {
      if (categoryNav.attr('data-open') === 'true') {
        $(this).attr('data-open', 'false')
        categoryNav.attr('data-open', 'false')
        $('.category-navigation__first-level').slideUp()
      } else {
        $(this).attr('data-open', 'true')
        categoryNav.attr('data-open', 'true')
        $('.category-navigation__first-level').slideDown()
      }
    })

	categoryNav.find('.category-navigation__first-level > ul > li > a').on('click', function(e) {
		e.preventDefault()
	})

  categoryNav.find('.category-navigation__second-level > ul > li > a').on('click', function(e) {
    e.preventDefault()
  })

  categoryNav.find('.category-navigation__first-level > ul > li > a > .icon').on('click', function() {
    const openedItem = $(this).parent()
    const secondLevel = $(this).parent().next('.category-navigation__second-level')

    if (openedItem.attr('data-open') === 'true') {
      openedItem.attr('data-open', 'false')
      secondLevel.slideUp()
    } else {
      openedItem.attr('data-open', 'true')
      secondLevel.slideDown()
    }
  })

  categoryNav.find('.category-navigation__second-level__open-icon').on('click', function() {
    const openedItem = $(this).parent()
    const thirdLevel = $(this).parent().next('.category-navigation__third-level')

    if (openedItem.attr('data-open') === 'true') {
      openedItem.attr('data-open', 'false')
      thirdLevel.slideUp()
    } else {
      openedItem.attr('data-open', 'true')
      thirdLevel.slideDown()
    }
  })

  $('#homepage-carousel').slick({
  	fade: true,
  	arrows: false,
  	dots: true,
  	appendDots: $('.homepage-carousel-dots')
  })

  const contentLeft = $('.content-left');
  const contentRight = $('.content-right');

  const moveContents = () => {
    if (window.innerWidth < 992) {
      contentRight.before(contentLeft);
    }

    if (window.innerWidth > 992) {
      contentLeft.before(contentRight);
    }
  };

  moveContents();
  $(window).resize(debounce(moveContents, 500));

  $('.check-in-block__login').on('click', function(e) {
    e.preventDefault();
    modals.open(loginForm);
  });
});