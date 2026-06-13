const WORLD_CUP_SWIPE_MIN_DISTANCE_PX = 48;
const WORLD_CUP_SWIPE_AXIS_LOCK_PX = 12;
const WORLD_CUP_SWIPE_AXIS_RATIO = 1.25;

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector("[data-world-cup-toggle]");
    const root = document.querySelector("[data-world-cup-root]");
    const pendingStorageKey = "openWorldCupViewer";

    if (!toggle) return;

    if (!root) {
        toggle.addEventListener("click", () => {
            sessionStorage.setItem(pendingStorageKey, "1");
            window.location.href = toggle.dataset.worldCupHomeUrl || "/";
        });

        return;
    }

    const player = root.querySelector("[data-world-cup-player]");
    const slides = Array.from(root.querySelectorAll("[data-world-cup-slide]"));
    const dots = Array.from(root.querySelectorAll("[data-world-cup-dot]"));
    const prevButton = root.querySelector("[data-world-cup-prev]");
    const nextButton = root.querySelector("[data-world-cup-next]");
    const closeTargets = root.querySelectorAll("[data-world-cup-close]");

    if (!player || slides.length === 0) return;

    let activeIndex = 0;

    const setActiveSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        player.dataset.worldCupLayout = slides[activeIndex].dataset.worldCupLayout || "standard";

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("is-active", slideIndex === activeIndex);
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("is-active", dotIndex === activeIndex);
        });
    };

    setActiveSlide(activeIndex);

    const openPlayer = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        root.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        player.setAttribute("aria-hidden", "false");
    };

    const closePlayer = () => {
        root.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        player.setAttribute("aria-hidden", "true");
    };

    toggle.addEventListener("click", (event) => {
        event.stopPropagation();

        if (root.classList.contains("is-open")) {
            closePlayer();
        } else {
            openPlayer();
        }
    });

    if (sessionStorage.getItem(pendingStorageKey) === "1") {
        sessionStorage.removeItem(pendingStorageKey);

        window.requestAnimationFrame(() => {
            openPlayer();
        });
    }

    prevButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        setActiveSlide(activeIndex - 1);
    });

    nextButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        setActiveSlide(activeIndex + 1);
    });

    attachWorldCupSwipe(player, {
        onSwipeLeft: () => setActiveSlide(activeIndex + 1),
        onSwipeRight: () => setActiveSlide(activeIndex - 1),
    });

    closeTargets.forEach((target) => {
        target.addEventListener("click", closePlayer);
    });

    dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", (event) => {
            event.stopPropagation();
            setActiveSlide(dotIndex);
        });
    });

    document.addEventListener("click", (event) => {
        if (!root.classList.contains("is-open")) return;
        if (root.contains(event.target) || toggle.contains(event.target)) return;

        closePlayer();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePlayer();
        }
    });
});

function attachWorldCupSwipe(element, { onSwipeLeft, onSwipeRight }) {
    let startX = 0;
    let startY = 0;
    let isTracking = false;
    let isHorizontalSwipe = false;

    const isInteractiveTarget = (target) => target.closest("button, a, input, textarea, select, label");

    element.addEventListener("touchstart", (event) => {
        if (event.touches.length !== 1 || isInteractiveTarget(event.target)) return;

        const touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        isTracking = true;
        isHorizontalSwipe = false;
    }, { passive: true });

    element.addEventListener("touchmove", (event) => {
        if (!isTracking || event.touches.length !== 1) return;

        const touch = event.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (
            !isHorizontalSwipe &&
            absX > WORLD_CUP_SWIPE_AXIS_LOCK_PX &&
            absX > absY * WORLD_CUP_SWIPE_AXIS_RATIO
        ) {
            isHorizontalSwipe = true;
        }

        if (isHorizontalSwipe) {
            event.preventDefault();
        }
    }, { passive: false });

    element.addEventListener("touchend", (event) => {
        if (!isTracking) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (absX >= WORLD_CUP_SWIPE_MIN_DISTANCE_PX && absX > absY * WORLD_CUP_SWIPE_AXIS_RATIO) {
            if (deltaX < 0) {
                onSwipeLeft?.();
            } else {
                onSwipeRight?.();
            }
        }

        isTracking = false;
        isHorizontalSwipe = false;
    }, { passive: true });

    element.addEventListener("touchcancel", () => {
        isTracking = false;
        isHorizontalSwipe = false;
    }, { passive: true });
}
