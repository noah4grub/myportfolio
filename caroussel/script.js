const swiper = new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,

    // Pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsiveness
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },

    // Centered slides for proper scaling
    centeredSlides: true, 
});
