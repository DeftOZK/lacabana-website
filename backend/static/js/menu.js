document.querySelectorAll("[data-flip-card]").forEach((card) => {
    const toggleCard = () => {
        const isFlipped = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", String(isFlipped));
    };

    card.addEventListener("click", toggleCard);

    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleCard();
        }
    });
});

const menuTargetProduct = new URLSearchParams(window.location.search).get("producto");

if (menuTargetProduct) {
    const targetCard = document.querySelector(`[data-menu-product="${CSS.escape(menuTargetProduct)}"]`);

    if (targetCard) {
        window.setTimeout(() => {
            targetCard.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            targetCard.classList.remove("is-flipped");
            targetCard.setAttribute("aria-pressed", "false");
            targetCard.classList.add("is-highlighted");
            targetCard.focus({ preventScroll: true });

            window.setTimeout(() => {
                targetCard.classList.remove("is-highlighted");
            }, 4500);
        }, 250);
    }
}

const menuFlipNotice = document.querySelector("[data-menu-flip-notice]");

if (menuFlipNotice) {
    window.setTimeout(() => {
        menuFlipNotice.classList.add("is-hidden");
    }, 5000);
}
