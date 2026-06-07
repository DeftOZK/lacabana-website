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

const menuFlipNotice = document.querySelector("[data-menu-flip-notice]");

if (menuFlipNotice) {
    window.setTimeout(() => {
        menuFlipNotice.classList.add("is-hidden");
    }, 5000);
}
