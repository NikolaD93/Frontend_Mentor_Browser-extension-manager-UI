const toggleIconElement = document.querySelector('#toggle-icon');
const toggleIconImageElement = document.querySelector('#toggle-icon-image');
const extensionsLogoElement = document.querySelector('#extensions-logo');

const btnAllElement = document.querySelector("#btn-all");
const btnActiveElement = document.querySelector("#btn-active");
const btnInactiveElement = document.querySelector("#btn-inactive");

const extensionsWrapperElement = document.querySelector('#extensions-wrapper');
const extensionsCountElement = document.querySelector('#extensions-count');

const loaderElement = document.querySelector('#loader');

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
let isLoading = false;

async function fetchData() {
    try {
        isLoading = true;
        renderExtensions();

        const response = await fetch('./data.json');
        const data = await response.json();
        extensionsData = data;
        isLoading = false;

        setTimeout(() => {
            renderExtensions();
        }, 1500);
    } catch (error) {
        console.error(error);
        isLoading = false;
    }
}


function renderExtensions(data) {
    if (isLoading) {
        loaderElement.classList.remove('hidden');
        extensionsWrapperElement.innerHTML = '';
        return;
    } else {
        loaderElement.classList.add('hidden');
    }

    data = data || extensionsData;
    extensionsWrapperElement.innerHTML = '';

    if (data.length === 0) {
        extensionsWrapperElement.innerHTML = "<p>No extensions available.</p>";
        return;
    }

    data.forEach((item, idx) => {
        const extension = document.createElement('div');
        extension.className = 'extension';

        extension.innerHTML = `
                <div class="extension-content">
                    <img class="extension-img" src="${item.logo}" alt="extension-icon"/>
                    <div class="extension-text">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                    </div>
                </div>
                <div class="extension-actions">
                    <button class="btn" onClick="handleDelete(${idx})">Remove</button>
                    <label class="switch">
                        <input type="checkbox" onchange="handleCheckboxChange(event, ${idx})" ${item.isActive ? "checked" : ""}/>
                        <span class="slider round"></span>
                    </label>
                </div>
            `;

        extensionsWrapperElement.appendChild(extension);
    });

    extensionsCountElement.textContent = `Total extensions (${data.length})`;
}

fetchData();

function handleCheckboxChange(e, id) {
    extensionsData[id].isActive = e.target.checked;
    renderExtensions();
}

function handleDelete(id) {
    extensionsData.splice(id, 1);
    renderExtensions();
}

function resetFilterActiveClass() {
    btnAllElement.classList.remove('filter-active');
    btnActiveElement.classList.remove('filter-active');
    btnInactiveElement.classList.remove('filter-active');
}

btnAllElement.addEventListener('click', () => {
    resetFilterActiveClass();
    btnAllElement.classList.add('filter-active');
    renderExtensions(extensionsData);
});

btnActiveElement.addEventListener('click', () => {
    resetFilterActiveClass();
    btnActiveElement.classList.add('filter-active');
    const activeElements = extensionsData.filter(data => data.isActive === true);
    renderExtensions(activeElements);
});

btnInactiveElement.addEventListener('click', () => {
    resetFilterActiveClass();
    btnInactiveElement.classList.add('filter-active');
    const inactiveElements = extensionsData.filter(data => data.isActive === false);
    renderExtensions(inactiveElements);
});
