import $ from 'jquery';
import 'slick-carousel';
import styles from '../scss/main.scss'
import sstyles from 'slick-carousel/slick/slick.css';
import ssstyles from 'slick-carousel/slick/slick-theme.css';

$('document').ready(() => {
	const mainNav = $('#main-nav > ul');
	const mmenuButton = $('.header-nav__open-mmenu');
	const openSearchButton = $('.header-nav__open-search');
	const searchBar = $('.header-toolbar__search');
	const openCategoryNav = $('.open-category-navigation');
	const categoryNav = $('#category-navigation > nav');

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

//  let activeFirstLevel = null;
//  let secondLevelHeight = 0;

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

//  categoryNav.find('.category-navigation__first-level > ul > li > a > .icon').on('click', function() {
//    const openedItem = $(this).parent()
//  	const secondLevel = $(this).parent().next('.category-navigation__second-level')
//    const secondLevelNav = secondLevel.find('> ul')
//    activeFirstLevel = secondLevel;
//    secondLevelHeight = secondLevelNav.outerHeight()
//
//    if (openedItem.attr('data-open') === 'true') {
//      openedItem.attr('data-open', 'false')
//      secondLevel.css({ height: 0 })
//    } else {
//      openedItem.attr('data-open', 'true')
//      secondLevel.css({ height: secondLevelNav.outerHeight() })
//    }
//  })
//
//
//
//  categoryNav.find('.category-navigation__second-level__open-icon').on('click', function() {
//    const openedItem = $(this).parent()
//    const thirdLevel = $(this).parent().next('.category-navigation__third-level')
//    const thirdLevelNav = thirdLevel.find('> ul')
//
//    if (openedItem.attr('data-open') === 'true') {
//      openedItem.attr('data-open', 'false')
//      $(this).closest('.category-navigation__second-level').css({ height: secondLevelHeight });
//      thirdLevel.css({ height: 0 })
//    } else {
//      openedItem.attr('data-open', 'true');
//      console.log(activeFirstLevel.find('> ul').outerHeight())
//      activeFirstLevel.css({ height: activeFirstLevel.find('> ul').outerHeight() + thirdLevelNav.outerHeight() });
//      thirdLevel.css({ height: thirdLevelNav.outerHeight() });
//    }
//  })

  $('#homepage-carousel').slick({
  	fade: true,
  	arrows: false,
  	dots: true,
  	appendDots: $('.homepage-carousel-dots')
  })

})