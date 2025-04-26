const toggleIconElement = document.querySelector('#toggle-icon');
const toggleIconImageElement = document.querySelector('#toggle-icon-image');
const extensionsLogoElement = document.querySelector('#extensions-logo');

const extensionsWrapperElement = document.querySelector('#extensions-wrapper');
const extensionsCountElement = document.querySelector('#extensions-count');

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

let extensionsData = [];

async function fetchData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        extensionsData = data;

        renderExtensions();
    } catch (error) {
        console.error(error);
    }
}

function renderExtensions() {
    extensionsWrapperElement.innerHTML = ''
    extensionsData.forEach((item, idx) => {
        const extension = document.createElement('div');
        extension.className = 'extension';

        extension.innerHTML = `
            <div class="extension-content">
                <img
                class="extension-img"
                src="${item.logo}"
                alt="extension-icon"
                />
                <div class="extension-text">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                </div>
            </div>
            <div class="extension-actions">
                <button class="btn" onClick="handleDelete(${idx})">Remove</button>
                <label class="switch">
                <input type="checkbox" onchange="handleCheckboxChange(event, ${idx})" ${item.isActive ? "checked" : null}/>
                <span class="slider round"></span>
                </label>
            </div>
        `;

        extensionsWrapperElement.appendChild(extension);
        extensionsCountElement.textContent = `Total extensions (${extensionsData.length})`
    });
}

fetchData();

function handleCheckboxChange(e, id) {
    extensionsData[id].isActive = e.target.checked
}

function handleDelete(id) {
    extensionsData.splice(id, 1)
    renderExtensions()
}



