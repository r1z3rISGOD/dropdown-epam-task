const listDown = document.querySelector('.dropdown__space-down'),
    listUp = document.querySelector('.dropdown__space-up'),
    btn = document.querySelector('.dropdown__input-button'),
    input = document.querySelector('.dropdown__input'),
    form = document.querySelector('.dropdown__form'),
    arr = [
        {
            "label": "Bawcomville",
            "id": 0
        },
        {
            "label": "Rushford",
            "id": 1
        },
        {
            "label": "Bayview",
            "id": 2
        },
        {
            "label": "Rushford",
            "id": 1
        },
        {
            "label": "Bayview",
            "id": 2
        },
        {
            "label": "Bayview",
            "id": 2
        }
    ];

input.value = '';
cord();
const items = document.querySelector('.dropdown__space-list');
vision(arr, items);

btn.addEventListener('click', () => {
    input.value = '';
    if (listDown.classList.contains('dropdown__space-active') || listUp.classList.contains('dropdown__space-active')) {
        listDown.classList.remove('dropdown__space-active');
        listUp.classList.remove('dropdown__space-active');
        btnName();
    } else {
        input.focus();
        cord().classList.add('dropdown__space-active');
        const elems = document.querySelectorAll('.dropdown__space-list__item');
        fill(elems);
        btnName();
    }
});

input.addEventListener('focus', () => {
    input.value = '';
    cord().classList.add('dropdown__space-active');
    const elems = document.querySelectorAll('.dropdown__space-list__item');
    fill(elems);
    btnName();
})

input.addEventListener('input', (e) => {
    const items = document.querySelector('.dropdown__space-list')
    vision(filter(e.target.value, arr), items);
    fill(document.querySelectorAll('.dropdown__space-list__item'));
})

window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('dropdown__space')
        && !e.target.classList.contains('dropdown__input-button')
        && !e.target.classList.contains('dropdown__input')
        && !e.target.classList.contains('dropdown__space-list__item')) {
        cord().classList.remove('dropdown__space-active');
        btnName();
    }
})

window.addEventListener('scroll', elBlur);

window.addEventListener('resize', elBlur);

function cord() {
    const size = window.screen.height;
    if (form.getBoundingClientRect().y + 300 > size) {
        return dropDownUp('.dropdown__space-up', listDown, listUp);
    } else {
        return dropDownUp('.dropdown__space-down', listUp, listDown);
    }
}

function dropDownUp(direction, first, second) {
    first.innerHTML = '';
    second.innerHTML = '<ul class="dropdown__space-list"></ul>'
    const items = document.querySelector('.dropdown__space-list')
    vision(arr, items);
    const elems = document.querySelectorAll('.dropdown__space-list__item');
    fill(elems);
    return document.querySelector(direction);
}

function vision(arr, items) {
    items.innerHTML = '';
    for (let obj of arr) {
        items.innerHTML += `<li id="${obj.id}" class="dropdown__space-list__item">${obj.label}</li>`;
    }
}

function fill(items) {
    for (let item of items) {
        item.addEventListener('click', (e) => {
            input.value = `${e.target.textContent}`;
            cord().classList.remove('dropdown__space-active');
            btnName();
        })
    }
}

function btnName() {
    if (cord().classList.contains('dropdown__space-active')) {
        btn.textContent = '▲';
    } else {
        btn.textContent = '▼';
    }
}

function filter(val, list) {
    return list.filter(i => i.label.toLowerCase().includes(val.toLowerCase()))
}

function remText(text, arr) {
    for (let val of arr) {
        if (val.label === text) {
            return true;
        }
    }
}

function elBlur() {
    input.blur();
    btn.blur();
    if (!remText(input.value, arr)) {
        input.value = ''
    }
    cord().classList.remove('dropdown__space-active');
    btnName();
}
