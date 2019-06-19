'use strict';

$(document).scroll(function() {
    let scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
});

$('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
});

$('form button[type=submit]').on('click', function (event) {
    event.preventDefault();
    formValidator($(this).parent());
});