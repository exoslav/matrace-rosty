import $ from 'jquery';
import $ui from './externals/jquery-ui.min.js';
import 'slick-carousel';
import lightBox2 from 'lightBox2';

import styles from '../scss/main.scss'
import sstyles from 'slick-carousel/slick/slick.css';
import ssstyles from 'slick-carousel/slick/slick-theme.css';
import lightBoxStyles from 'lightBox2/src/css/lightbox.css';

import * as modals from './modals';
import loginForm from './login-form';
import initConfigurator from './product-detail/configurator/configurator';

$('document').ready(function() {
	const mainNav = $('#main-nav > ul');
	const mmenuButton = $('.header-nav__open-mmenu');
	const openSearchButton = $('.header-nav__open-search');
	const searchBar = $('.header-toolbar__search');
	const openCategoryNav = $('.open-category-navigation');
	const categoryNav = $('#category-navigation > nav');

  $(() => $('.ui-tabs-component').tabs());

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
  }

	mmenuButton.on('click', function() {
		if (mainNav.attr('data-open') === 'true') {
			mainNav.attr('data-open', 'false');
		} else {
			mainNav.attr('data-open', 'true');
		}
	})

	openSearchButton.on('click', function() {
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

  categoryNav.find('.category-navigation__first-level > ul > li > a > .icon').on('click', function(e) {
    e.preventDefault()
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

  categoryNav.find('.category-navigation__second-level__open-icon').on('click', function(e) {
    e.preventDefault()
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

  $('.bonus-products__list').slick({
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          adaptiveHeight: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          adaptiveHeight: true
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          adaptiveHeight: true
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  $('.product-detail__product-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      customPaging: function(slick, i) {
          var thumb = $(slick.$slides[i]).find('.product-detail__slider-item').data('thumb');
          console.log(slick.$slides[i])
          return '<a><img src="'+thumb+'"></a>';
      },
      arrows: true,
      fade: false,
      dots: true,
      nextArrow: '<button type="button" class="slick-next"></button>',
      prevArrow: '<button type="button" class="slick-prev"></button>'
  });




  const contentLeft = $('.content-left');
  const contentRight = $('.content-right');

  const moveContents = function() {
    if (window.innerWidth < 992) {
      contentRight.before(contentLeft);
    }

    if (window.innerWidth > 992) {
      contentLeft.before(contentRight);
    }
  };

  moveContents();
  $(window).resize(debounce(moveContents, 500));

  $('.check-in-block__login--login-form').on('click', function(e) {
    e.preventDefault();
    modals.open(loginForm);
  });

  $('.check-in-block__login--logged-user').on('click', function(e) {
    $('.check-in-block__login--logged-user__list').toggle();
  });

  $('#basket-form-delivery-address').on('change', () => {
    const addressBlock = $('.basket-addresses-forms__delivery-address-block')

    if (addressBlock.attr('data-open') === 'true') {
      addressBlock.attr('data-open', 'false')
      addressBlock.slideUp()
    } else {
      addressBlock.attr('data-open', 'true')
      addressBlock.slideDown()
    }
  });

  $('#frm-cartForm-invoiceInformation-companyOrder').on('change', () => {
    const firmBlock = $('.firm-purchase')

    if (firmBlock.attr('data-open') === 'true') {
      firmBlock.attr('data-open', 'false')
      firmBlock.slideUp()
    } else {
      firmBlock.attr('data-open', 'true')
      firmBlock.slideDown()
    }
  });

  initConfigurator()

  window.onBasketAdded = data => {
    let content = null

    if (data.productAdded) {
      content = `
        <div class="modal__header">
          <h2 class="add-to-basket-modal__title">Zboží vloženo do košíku</h2>
        </div>
        
        <div class="modal__body">
          <div class="added-to-basket__content">
            <strong class="add-to-basket-modal__product-name">${data.productCountAddedToBasket}x ${data.productName}</strong>
            <strong class="add-to-basket-modal__price">${data.productPriceAddedToBasket}&nbsp;Kč</strong>
          </div>
          
          <div class="added-to-basket__footer">
            <a href="/kosik" class="add-to-basket-modal__to-basket">K objednávce</a>
            <a href="/" class="modal__close add-to-basket-modal__continue-shopping">Pokračovat v nákupu</a>
          </div>
        </div>
      `
    } else {

    }

    modals.open(content);
  }

  window.cartStepOneFormFunction = () => {
    $('#cartStepOneForm .form-data-change').on('change', () => {
      $('.hidden-refresh-button').click()
    })
  }

  window.cartStepOneFormFunction();
});