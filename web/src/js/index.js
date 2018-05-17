import $ from 'jquery';
import 'slick-carousel';
import styles from '../scss/main.scss'
import sstyles from 'slick-carousel/slick/slick.css';
import ssstyles from 'slick-carousel/slick/slick-theme.css';

$('document').ready(() => {
	const mainNav = $('#main-nav > ul')
	const mmenuButton = $('.header-nav__open-mmenu')
	const openSearchButton = $('.header-nav__open-search')
	const searchBar = $('.header-toolbar__search')
	const hpCarousel = $('#homepage-carousel')

	mmenuButton.on('click', () => {
		if (mainNav.attr('data-opened') === 'true') {
			mainNav.attr('data-opened', 'false')
		} else {
			mainNav.attr('data-opened', 'true')
		}
	})

	openSearchButton.on('click', () => {
		if (searchBar.attr('data-opened') === 'true') {
			searchBar.attr('data-opened', 'false')
		} else {
			searchBar.attr('data-opened', 'true')
		}
	})

  $('#homepage-carousel').slick({
  	fade: true
  });

})