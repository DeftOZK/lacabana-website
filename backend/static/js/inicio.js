const CAROUSEL_COOLDOWN_MS = 10000;
const PHONE_SLIDE_ANIMATION_MS = 380;
const SWIPE_MIN_DISTANCE_PX = 48;
const SWIPE_AXIS_LOCK_PX = 12;
const SWIPE_AXIS_RATIO = 1.25;

document.addEventListener('DOMContentLoaded', () => {
    initPromoCarousel();
    initPromoInfoToggle();
    initPhoneCarousel();
    initMenuPdfViewer();
    initLocalImageCarousel();
    initFeaturedMenuLinks();
});

function initFeaturedMenuLinks() {
    const grid = document.querySelector('[data-featured-menu-url]');
    if (!grid) return;

    const menuUrl = grid.dataset.featuredMenuUrl || '/menu/';
    const cards = Array.from(grid.querySelectorAll('[data-featured-target]'));

    cards.forEach((card) => {
        const goToProduct = () => {
            const target = card.dataset.featuredTarget;
            if (!target) return;

            window.location.href = `${menuUrl}?producto=${encodeURIComponent(target)}`;
        };

        card.addEventListener('click', goToProduct);
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                goToProduct();
            }
        });
    });
}

function initPromoCarousel() {
    const carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsWrap = carousel.querySelector('[data-carousel-dots]');
    const counter = carousel.querySelector('[data-carousel-counter]');
    let index = 0;
    let autoplayTimer;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'promo-dot';
        dot.setAttribute('aria-label', `Ir a promoción ${i + 1}`);
        dot.addEventListener('click', () => {
            index = i;
            render();
            schedule();
        });
        dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.querySelectorAll('.promo-dot'));

    function render() {
        slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
        if (counter) {
            counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
        }
    }

    function next() {
        index = (index + 1) % slides.length;
        render();
    }

    function prev() {
        index = (index - 1 + slides.length) % slides.length;
        render();
    }

    function schedule() {
        clearTimeout(autoplayTimer);
        autoplayTimer = window.setTimeout(() => {
            next();
            schedule();
        }, CAROUSEL_COOLDOWN_MS);
    }

    function stop() {
        clearTimeout(autoplayTimer);
        autoplayTimer = null;
    }

    nextBtn?.addEventListener('click', () => {
        next();
        schedule();
    });

    prevBtn?.addEventListener('click', () => {
        prev();
        schedule();
    });

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', schedule);
    attachSwipeGesture(carousel, {
        onStart: stop,
        onSwipeLeft: () => {
            next();
            schedule();
        },
        onSwipeRight: () => {
            prev();
            schedule();
        },
    });

    render();
    schedule();
}

function attachSwipeGesture(element, { onStart, onSwipeLeft, onSwipeRight }) {
    let startX = 0;
    let startY = 0;
    let isTracking = false;
    let isHorizontalSwipe = false;

    const isInteractiveTarget = (target) => target.closest('button, a, input, textarea, select, label');

    element.addEventListener('touchstart', (event) => {
        if (event.touches.length !== 1 || isInteractiveTarget(event.target)) return;

        const touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        isTracking = true;
        isHorizontalSwipe = false;
    }, { passive: true });

    element.addEventListener('touchmove', (event) => {
        if (!isTracking || event.touches.length !== 1) return;

        const touch = event.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (!isHorizontalSwipe && absX > SWIPE_AXIS_LOCK_PX && absX > absY * SWIPE_AXIS_RATIO) {
            isHorizontalSwipe = true;
            onStart?.();
        }

        if (isHorizontalSwipe) {
            event.preventDefault();
        }
    }, { passive: false });

    element.addEventListener('touchend', (event) => {
        if (!isTracking) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (absX >= SWIPE_MIN_DISTANCE_PX && absX > absY * SWIPE_AXIS_RATIO) {
            if (deltaX < 0) {
                onSwipeLeft?.();
            } else {
                onSwipeRight?.();
            }
        }

        isTracking = false;
        isHorizontalSwipe = false;
    }, { passive: true });

    element.addEventListener('touchcancel', () => {
        isTracking = false;
        isHorizontalSwipe = false;
    }, { passive: true });
}

function initPromoInfoToggle() {
    const carousel = document.querySelector('[data-carousel]');
    const toggle = carousel?.querySelector('[data-promo-info-toggle]');
    if (!carousel || !toggle) return;

    function render() {
        const isHidden = carousel.classList.contains('is-info-hidden');
        toggle.setAttribute('aria-pressed', String(isHidden));
        toggle.setAttribute(
            'aria-label',
            isHidden ? 'Mostrar informacion de promociones' : 'Ocultar informacion de promociones'
        );
        toggle.title = isHidden ? 'Mostrar informacion' : 'Ocultar informacion';
    }

    toggle.addEventListener('click', () => {
        carousel.classList.toggle('is-info-hidden');
        render();
    });

    render();
}

function initPhoneCarousel() {
    const phone = document.querySelector('[data-phone-carousel]');
    if (!phone) return;

    const slides = Array.from(phone.querySelectorAll('[data-phone-slide]'));
    const prevBtn = phone.querySelector('[data-phone-prev]');
    const nextBtn = phone.querySelector('[data-phone-next]');
    const dotsWrap = phone.querySelector('[data-phone-dots]');
    const stepCallout = phone.querySelector('[data-phone-step-callout]');
    const redeemStepCallout = phone.querySelector('[data-redeem-step-callout]');
    let index = 0;
    let autoplayTimer;
    let isAnimating = false;
    let animationTimer;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'phone-dot';
        dot.setAttribute('aria-label', `Ir a pantalla ${i + 1} del telefono`);
        dot.addEventListener('click', () => {
            showSlide(i);
            schedule();
        });
        dotsWrap?.appendChild(dot);
    });

    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.phone-dot')) : [];

    function render(previousIndex = null) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
            slide.classList.toggle('is-active', i === index);
        });
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
        stepCallout?.classList.toggle('is-hidden', index !== 0);
        redeemStepCallout?.classList.toggle('is-hidden', index !== 1);

        if (previousIndex !== null) {
            isAnimating = true;
            clearTimeout(animationTimer);
            animationTimer = window.setTimeout(() => {
                isAnimating = false;
            }, PHONE_SLIDE_ANIMATION_MS);
        }
    }

    function showSlide(nextIndex) {
        const normalizedIndex = (nextIndex + slides.length) % slides.length;
        if (isAnimating || normalizedIndex === index) return false;
        const previousIndex = index;
        index = normalizedIndex;
        render(previousIndex);
        return true;
    }

    function next() {
        showSlide(index + 1);
    }

    function prev() {
        showSlide(index - 1);
    }

    function schedule() {
        clearTimeout(autoplayTimer);
        autoplayTimer = window.setTimeout(() => {
            next();
            schedule();
        }, CAROUSEL_COOLDOWN_MS);
    }

    function stop() {
        clearTimeout(autoplayTimer);
        autoplayTimer = null;
    }

    nextBtn?.addEventListener('click', () => {
        next();
        schedule();
    });

    prevBtn?.addEventListener('click', () => {
        prev();
        schedule();
    });

    phone.addEventListener('mouseenter', stop);
    phone.addEventListener('mouseleave', schedule);

    render();
    schedule();
}

function initMenuPdfViewer() {
    const viewer = document.querySelector('[data-menu-pdf]');
    if (!viewer) return;

    const image = viewer.querySelector('[data-menu-page-image]');
    const frame = viewer.querySelector('.menu-pdf-frame');
    const pageLabel = viewer.querySelector('[data-pdf-page]');
    const zoomLabel = viewer.querySelector('[data-pdf-zoom]');
    const prevBtn = viewer.querySelector('[data-pdf-prev]');
    const nextBtn = viewer.querySelector('[data-pdf-next]');
    const zoomOutBtn = viewer.querySelector('[data-pdf-zoom-out]');
    const zoomInBtn = viewer.querySelector('[data-pdf-zoom-in]');
    const resetBtn = viewer.querySelector('[data-pdf-reset]');

    if (!image) return;

    const pages = [
        viewer.getAttribute('data-page-1'),
        viewer.getAttribute('data-page-2'),
    ].filter(Boolean);
    const minScale = .8;
    const maxScale = 2.5;
    let pageNum = 0;
    let scale = 1;

    function getBaseWidth() {
        const frameWidth = frame ? frame.clientWidth - 48 : 760;
        return Math.max(260, Math.min(frameWidth, 760));
    }

    function updateLabels() {
        if (pageLabel) pageLabel.textContent = `${pageNum + 1} / ${pages.length}`;
        if (zoomLabel) zoomLabel.textContent = `${Math.round(scale * 100)}%`;
        if (prevBtn) prevBtn.disabled = pageNum <= 0;
        if (nextBtn) nextBtn.disabled = pageNum >= pages.length - 1;
        if (zoomOutBtn) zoomOutBtn.disabled = scale <= minScale;
        if (zoomInBtn) zoomInBtn.disabled = scale >= maxScale;
    }

    function render() {
        if (!pages.length) return;
        image.src = pages[pageNum];
        image.alt = `Pagina ${pageNum + 1} del menu de La Cabana`;
        image.style.width = `${Math.round(getBaseWidth() * scale)}px`;
        updateLabels();
    }

    function changePage(direction) {
        const nextPage = pageNum + direction;
        if (nextPage < 0 || nextPage >= pages.length) return;
        pageNum = nextPage;
        render();
        frame?.scrollTo({ top: 0, left: 0 });
    }

    function changeZoom(amount) {
        scale = Math.min(maxScale, Math.max(minScale, Number((scale + amount).toFixed(2))));
        render();
    }

    prevBtn?.addEventListener('click', () => changePage(-1));
    nextBtn?.addEventListener('click', () => changePage(1));
    zoomOutBtn?.addEventListener('click', () => changeZoom(-.15));
    zoomInBtn?.addEventListener('click', () => changeZoom(.15));
    resetBtn?.addEventListener('click', () => {
        scale = 1;
        render();
        frame?.scrollTo({ top: 0, left: 0 });
    });

    window.addEventListener('resize', render);
    render();
}

function initLocalImageCarousel() {
    const carousel = document.querySelector('[data-local-carousel]');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('[data-local-slide]'));
    const prevBtn = carousel.querySelector('[data-local-prev]');
    const nextBtn = carousel.querySelector('[data-local-next]');
    if (slides.length <= 1 || !prevBtn || !nextBtn) return;

    let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
    let autoplayTimer;
    if (activeIndex < 0) activeIndex = 0;

    function showSlide(nextIndex) {
        activeIndex = (nextIndex + slides.length) % slides.length;
        slides.forEach((slide, index) => {
            slide.classList.toggle('is-active', index === activeIndex);
        });
    }

    function startAutoplay() {
        window.clearInterval(autoplayTimer);
        autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1), CAROUSEL_COOLDOWN_MS);
    }

    function goToSlide(nextIndex) {
        showSlide(nextIndex);
        startAutoplay();
    }

    prevBtn.addEventListener('click', () => goToSlide(activeIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(activeIndex + 1));
    attachSwipeGesture(carousel, {
        onStart: () => window.clearInterval(autoplayTimer),
        onSwipeLeft: () => goToSlide(activeIndex + 1),
        onSwipeRight: () => goToSlide(activeIndex - 1),
    });

    showSlide(activeIndex);
    startAutoplay();
}
