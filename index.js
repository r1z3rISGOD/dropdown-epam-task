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


const itemDown = document.querySelector('.dropdown__space-down');
const itemUp = document.querySelector('.dropdown__space-up');
visionElements(arr, itemDown);
visionElements(arr, itemUp);
const itemSize = document.querySelector('.dropdown__space-list__item');


btn.addEventListener('click', () => {
    const listDownHasClass = listDown.classList.contains('dropdown__space-active'),
        listUpHasClass = listUp.classList.contains('dropdown__space-active');

    input.value = '';
    if (listDownHasClass || listUpHasClass) {
        listDown.classList.remove('dropdown__space-active');
        listUp.classList.remove('dropdown__space-active');
        changeBtnSign();
    } else {
        input.focus();
        visionElements(arr, sizingItem())
        const elems = document.querySelectorAll('.dropdown__space-list__item');
        clickingItems(elems);
        changeBtnSign();
    }
});

input.addEventListener('focus', () => {
    input.value = '';
    sizingItem().classList.add('dropdown__space-active');
    const active = document.querySelector('.dropdown__space-active');
    active.style.maxHeight = `${itemSize * 5}`;
    const elems = document.querySelectorAll('.dropdown__space-list__item');
    clickingItems(elems);
    changeBtnSign();
})

input.addEventListener('input', (e) => {
    const items = document.querySelector('.dropdown__space-active'),
        dropdownItem = document.querySelectorAll('.dropdown__space-list__item');

    visionElements(filterElements(e.target.value, arr), items);
    clickingItems(dropdownItem);
})

window.addEventListener('click', (e) => {
    const dropSpace = e.target.classList.contains('dropdown__space'),
        dropInputButton = e.target.classList.contains('dropdown__input-button'),
        dropInput = e.target.classList.contains('dropdown__input'),
        dropItems = e.target.classList.contains('dropdown__space-list__item');

    if (!dropSpace
        && !dropInputButton
        && !dropInput
        && !dropItems) {
        sizingItem().classList.remove('dropdown__space-active');
        changeBtnSign();
    }
})

window.addEventListener('scroll', blurElements);

window.addEventListener('resize', blurElements);

function sizingItem() {
    const size = window.innerHeight,
        itemSize = document.querySelector('.dropdown__space-list__item'),
        listSize = itemSize.offsetHeight,
        inputSize = input.offsetHeight;
    if (form.getBoundingClientRect().y + listSize * 5 + inputSize + listSize * 5 > size) {
        return dropDownUp('.dropdown__space-up', listDown, listUp);
    } else {
        return dropDownUp('.dropdown__space-down', listUp, listDown);
    }
}

function dropDownUp(direction, first, second) {
    first.classList.remove('dropdown__space-active');
    second.classList.add('dropdown__space-active');
    const elems = document.querySelectorAll('.dropdown__space-list__item');
    clickingItems(elems);
    return document.querySelector(direction);
}

function visionElements(arr, items) {
    items.innerHTML = '';
    for (let obj of arr) {
        items.innerHTML += `<li id="${obj.id}" class="dropdown__space-list__item">${obj.label}</li>`;
    }
    const elems = document.querySelectorAll('.dropdown__space-list__item');
    clickingItems(elems);
}

function clickingItems(items) {
    for (let item of items) {
        item.addEventListener('click', (e) => {
            input.value = `${e.target.textContent}`;
            sizingItem().classList.remove('dropdown__space-active');
            changeBtnSign();
        })

        item.addEventListener('mouseenter', (e) => {
            e.target.style.backgroundColor = '#4ea8f5';
            e.target.style.color = "white"
        })

        item.addEventListener('mouseleave', (e) => {
            e.target.style.backgroundColor = '';
            e.target.style.color = "black"
        })
    }
}

function changeBtnSign() {
    const listDownHasClass = listDown.classList.contains('dropdown__space-active'),
        listUpHasClass = listUp.classList.contains('dropdown__space-active'),
        size = window.innerHeight,
        itemSize = document.querySelector('.dropdown__space-list__item'),
        listSize = itemSize.offsetHeight,
        inputSize = input.offsetHeight;

    if (listDownHasClass || !listUpHasClass && form.getBoundingClientRect().y + listSize * 5 + inputSize + listSize * 5 > size) {
        btn.textContent = '▲';
    } else if (!listDownHasClass || listUpHasClass && !(form.getBoundingClientRect().y + listSize * 5 + inputSize + listSize * 5 > size)) {
        btn.textContent = '▼';
    }
}

function filterElements(val, list) {
    return list.filter(i => i.label.toLowerCase().includes(val.toLowerCase()))
}

function removeText(text, arr) {
    for (let val of arr) {
        if (val.label === text) {
            return true;
        }
    }
}

function blurElements() {
    input.blur();
    btn.blur();
    if (!removeText(input.value, arr)) {
        input.value = ''
    }
    sizingItem().classList.remove('dropdown__space-active');
    changeBtnSign();
}
