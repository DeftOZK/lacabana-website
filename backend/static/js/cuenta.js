document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('[data-account-tabs]');
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll('[data-account-tab]'));
    const panels = Array.from(root.querySelectorAll('[data-account-panel]'));
    const switches = Array.from(root.querySelectorAll('[data-account-switch]'));
    const forms = Array.from(root.querySelectorAll('form'));

    function showPanel(name) {
        tabs.forEach((tab) => {
            const isActive = tab.dataset.accountTab === name;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
        });

        panels.forEach((panel) => {
            panel.classList.toggle('is-active', panel.dataset.accountPanel === name);
        });
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => showPanel(tab.dataset.accountTab));
    });

    switches.forEach((button) => {
        button.addEventListener('click', () => showPanel(button.dataset.accountSwitch));
    });

    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    });
});
