'use strict';

Promise.resolve($.ajax('data.json')).then(
    function (data){
        let {portfolio, slider} = data;

        createPortfolio(portfolio);
        createSlider(slider);

    }, function (errorMessage) {
        $('#page-top').html(errorMessage.responseText);
    }
);


let createPortfolio = (portfolio) => {
    $.each(portfolio, (index, item) =>{
        let {title, image, description} = item;

        index++;

        let portfolioItem = '<div class="col-md-6 col-lg-4">';
        portfolioItem += `<div class="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal${index}">`;
        portfolioItem += '<div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">';
        portfolioItem += '<div class="portfolio-item-caption-content text-center text-white">';
        portfolioItem += '<i class="fas fa-plus fa-3x"></i>';
        portfolioItem += '</div>';
        portfolioItem += '</div>';
        portfolioItem += `<img class="img-fluid" src="img/portfolio/${image}" alt="">`;
        portfolioItem += '</div>';
        portfolioItem += '</div>';

        $('#portfolio .row').append(portfolioItem);

        let modalPortfolioItem = `<div class="portfolio-modal modal fade" id="portfolioModal${index}" tabindex="-1" role="dialog" aria-labelledby="portfolioModal${index}Label" aria-hidden="true">`;
        modalPortfolioItem += '<div class="modal-dialog modal-xl" role="document">';
        modalPortfolioItem += '<div class="modal-content">';
        modalPortfolioItem += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
        modalPortfolioItem += '<span aria-hidden="true">';
        modalPortfolioItem += '<i class="fas fa-times"></i>';
        modalPortfolioItem += '</span>';
        modalPortfolioItem += '</button>';
        modalPortfolioItem += '<div class="modal-body text-center">';
        modalPortfolioItem += '<div class="container">';
        modalPortfolioItem += '<div class="row justify-content-center">';
        modalPortfolioItem += '<div class="col-lg-8">';
        modalPortfolioItem += `<h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">${title}</h2>`;
        modalPortfolioItem += '<div class="divider-custom">';
        modalPortfolioItem += '<div class="divider-custom-line"></div>';
        modalPortfolioItem += '<div class="divider-custom-icon">';
        modalPortfolioItem += '<i class="fas fa-star"></i>';
        modalPortfolioItem += '</div>';
        modalPortfolioItem += '<div class="divider-custom-line"></div>';
        modalPortfolioItem += '</div>';
        modalPortfolioItem += `<img class="img-fluid rounded mb-5" src="img/portfolio/${image}" alt="">`;
        modalPortfolioItem += `<p class="mb-5">${description}</p>`;
        modalPortfolioItem += '<button class="btn btn-primary" data-dismiss="modal"><i class="fas fa-times fa-fw"></i> Close Window</button>';
        modalPortfolioItem += '</div>';
        modalPortfolioItem += '</div>';
        modalPortfolioItem += '</div>';
        modalPortfolioItem += '</div>';
        modalPortfolioItem += '</div>';
        modalPortfolioItem += '</div>';
        modalPortfolioItem += '</div>';

        $('.copyright').after(modalPortfolioItem);
    });
};

let createSlider = (slider) => {

    $('.masthead').append('<div class="owl-carousel owl-theme"> </div>');

    $.each(slider, (index, item) =>{
        let {title, image, description} = item;

        let sliderItem = '<div>';
        sliderItem += '<div class="container d-flex align-items-center flex-column">';
        sliderItem += '<div class="masthead-avatar mb-5">';
        sliderItem += `<img src="img/${image}" alt="">`;
        sliderItem += '</div>';
        sliderItem += `<h1 class="masthead-heading text-uppercase mb-0">${title}</h1>`;
        sliderItem += '<div class="divider-custom divider-light">';
        sliderItem += '<div class="divider-custom-line"></div>';
        sliderItem += '<div class="divider-custom-icon">';
        sliderItem += '<i class="fas fa-star"></i>';
        sliderItem += '</div>';
        sliderItem += '<div class="divider-custom-line"></div>';
        sliderItem += '</div>';
        sliderItem += `<p class="masthead-subheading font-weight-light mb-0">${description}</p>`;
        sliderItem += '</div>';
        sliderItem += '</div>';
        $('.owl-carousel.owl-theme').append(sliderItem);
    });

    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        center: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
    });
};

let formValidator = (form) => {

    cleanErrors();

    let patternName = /^([A-Z][a-z]+)?([А-Я][а-я]+)?$/;
    let patternEmail = /^\w+\.?\w+@\w+\.[a-z]{2,}$/;
    let patternPhone = /^\+?\d{2}(\(\d{3}\)\d{5})?( \(\d{3}\) \d{3} \d{2} )?( \(\d{3}\) \d{5})?\d{8}?\d{2}$/;

    if (!((patternName.test(form.find('input[name=name]').val()))) || !form.find('input[name=name]').val()) {
        showError(form.find('input[name=name]'));
        return false;
    }

    if (!(patternEmail.test(form.find('input[name=email]').val()))) {
        showError(form.find('input[name=email]'));
        return false;
    }

    if (!(form.find('input[name=phone]').val() === undefined)){
        if (!((patternPhone.test(form.find('input[name=phone]').val()))) || !form.find('input[name=phone]').val()) {
            showError(form.find('input[name=phone]'));
            return false;
        }
    }

    if (!(form.find('input:password').val() === undefined)){
        if (!form.find('input:password').val()) {
            showError(form.find('input:password'));
            return false;
        }
    }

    if (!(form.find('textarea[name=message]').val() === undefined)){
        if (!form.find('textarea[name=message]').val()) {
            showError(form.find('textarea[name=message]'));
            return false;
        }
    }

    return successMessage(form);

};

let showError = (element) => element.after(`<div class="alert alert-danger" role="alert">${element.attr('data-validation-required-message')}</div>`);

let cleanErrors = () => $('.alert.alert-danger').remove();

let successMessage = (form) => {
    form.children('.success').append('<div class="alert alert-success" role="alert">Form submitted successfully</div>');
    form.find('input, textarea').val('');
    setTimeout(function () {
        $('.alert.alert-success').remove();
    },3000);
};