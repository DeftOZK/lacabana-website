const CAROUSEL_COOLDOWN_MS = 5000;
const PHONE_SLIDE_ANIMATION_MS = 380;

document.addEventListener('DOMContentLoaded', () => {
    initPromoCarousel();
    initPhoneCarousel();
    initMenuPdfViewer();
    initLocalLogoFontSwitcher();
});

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

    render();
    schedule();
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

function initLocalLogoFontSwitcher() {
    const host = document.getElementById('localFontButtons');
    if (!host) return;

    const fonts = [
        { name: '01 · Caveat', family: "'Caveat', cursive", note: 'Irregular y orgánica' },
        { name: '02 · Kalam', family: "'Kalam', cursive", note: 'Marcador escolar legible' },
        { name: '03 · Gloria Hallelujah', family: "'Gloria Hallelujah', cursive", note: 'Descuidada y expresiva' },
        { name: '04 · Permanent Marker', family: "'Permanent Marker', cursive", note: 'Trazo grueso y audaz' },
        { name: '05 · Gochi Hand', family: "'Gochi Hand', cursive", note: 'Redondeada y juvenil' },
        { name: '06 · Indie Flower', family: "'Indie Flower', cursive", note: 'Delgada y amigable' },
        { name: '07 · Amatic SC', family: "'Amatic SC', cursive", note: 'Alta y manual' },
        { name: '08 · Marker Felt', family: "'Marker Felt', 'Comic Sans MS', cursive", note: 'Clásica de marcador' },
        { name: '09 · Comic Neue', family: "'Comic Neue', cursive", note: 'Manual y limpia' },
        { name: '10 · Shadows Into Light', family: "'Shadows Into Light', cursive", note: 'Casual con inclinación' },
    ];

    const root = document.documentElement;
    const stored = window.localStorage.getItem('lacabana_local_font');
    let activeIndex = stored ? Number(stored) : 0;
    if (Number.isNaN(activeIndex) || activeIndex < 0 || activeIndex >= fonts.length) activeIndex = 0;

    function applyFont(index) {
        root.style.setProperty('--local-title-font', fonts[index].family);
        window.localStorage.setItem('lacabana_local_font', String(index));
    }

    fonts.forEach((font, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'local-font-btn';
        button.style.fontFamily = font.family;
        button.innerHTML = `
            <span class="local-font-preview">La Cabaña</span>
            <span class="local-font-name">${font.name}</span>
            <span class="local-font-note">${font.note}</span>
        `;
        button.addEventListener('click', () => {
            activeIndex = index;
            applyFont(activeIndex);
            updateActive();
        });
        host.appendChild(button);
    });

    const buttons = Array.from(host.querySelectorAll('.local-font-btn'));

    function updateActive() {
        buttons.forEach((button, idx) => button.classList.toggle('is-active', idx === activeIndex));
    }

    applyFont(activeIndex);
    updateActive();
}
