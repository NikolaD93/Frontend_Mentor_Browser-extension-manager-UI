const toggleIconElement = document.querySelector('#toggle-icon');
const toggleIconImageElement = document.querySelector('#toggle-icon-image');
const extensionsLogoElement = document.querySelector('#extensions-logo');

toggleIconElement.addEventListener('click', handleThemeToggle);

function handleThemeToggle() {
    document.body.classList.toggle('dark');

    console.log(toggleIconImageElement.src.includes("icon-moon.svg"))

    toggleIconImageElement.src = toggleIconImageElement.src.includes("icon-moon.svg")
        ? "./assets/images/icon-sun.svg"
        : "./assets/images/icon-moon.svg";

    extensionsLogoElement.src = extensionsLogoElement.src.includes("logo-dark.svg")
        ? "./assets/images/logo.svg"
        : "./assets/images/logo-dark.svg";
}
