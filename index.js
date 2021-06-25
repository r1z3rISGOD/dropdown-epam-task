const listDown = document.querySelector('.form__modal-down'),
    listUp = document.querySelector('.form__modal-up'),
    btn = document.querySelector('.form__button'),
    input = document.querySelector('.form__input'),
    form = document.querySelector('.form'),
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


const itemDown = document.querySelector('.form__modal-down');
const itemUp = document.querySelector('.form__modal-up');
visionElements(arr, itemDown);
visionElements(arr, itemUp);
const itemSize = document.querySelector('.form-modal__item');


btn.addEventListener('click', () => {
    const listDownHasClass = listDown.classList.contains('form-modal--active'),
        listUpHasClass = listUp.classList.contains('form-modal--active');

    input.value = '';
    if (listDownHasClass || listUpHasClass) {
        listDown.classList.remove('form-modal--active');
        listUp.classList.remove('form-modal--active');
        changeBtnSign();
    } else {
        input.focus();
        visionElements(arr, sizingItem())
        const elems = document.querySelectorAll('.form-modal__item');
        clickingItems(elems);
        changeBtnSign();
    }
});

input.addEventListener('focus', () => {
    input.value = '';
    sizingItem().classList.add('dropdown__space-active');
    const active = document.querySelector('.form-modal--active');
    active.style.maxHeight = `${itemSize * 5}`;
    const elems = document.querySelectorAll('.form-modal__item');
    clickingItems(elems);
    changeBtnSign();
})

input.addEventListener('input', (e) => {
    const items = document.querySelector('.form-modal--active'),
        dropdownItem = document.querySelectorAll('.form-modal__item');

    visionElements(filterElements(e.target.value, arr), items);
    clickingItems(dropdownItem);
})

window.addEventListener('click', (e) => {
    const dropInputButton = e.target.classList.contains('form__button'),
        dropInput = e.target.classList.contains('form__input'),
        dropItems = e.target.classList.contains('dropdown__space-list__item');

    if (!dropInputButton
        && !dropInput
        && !dropItems) {
        sizingItem().classList.remove('form-modal--active');
        changeBtnSign();
    }
})

window.addEventListener('scroll', blurElements);

window.addEventListener('resize', blurElements);

function sizingItem() {
    const size = window.innerHeight,
        itemSize = document.querySelector('.form-modal__item'),
        listSize = itemSize.offsetHeight,
        inputSize = input.offsetHeight;
    if (form.getBoundingClientRect().y + listSize * 5 + inputSize + listSize * 5 > size) {
        return dropDownUp('.form__modal-up', listDown, listUp);
    } else {
        return dropDownUp('.form__modal-down', listUp, listDown);
    }
}

function dropDownUp(direction, first, second) {
    first.classList.remove('form-modal--active');
    second.classList.add('form-modal--active');
    const elems = document.querySelectorAll('.form-modal__item');
    clickingItems(elems);
    return document.querySelector(direction);
}

function visionElements(arr, items) {
    items.innerHTML = '';
    for (let obj of arr) {
        items.innerHTML += `<li id="${obj.id}" class="form-modal__item">${obj.label}</li>`;
    }
    const elems = document.querySelectorAll('.form-modal__item');
    clickingItems(elems);
}

function clickingItems(items) {
    for (let item of items) {
        item.addEventListener('click', (e) => {
            input.value = `${e.target.textContent}`;
            sizingItem().classList.remove('form-modal--active');
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
    const listDownHasClass = listDown.classList.contains('form-modal--active'),
        listUpHasClass = listUp.classList.contains('form-modal--active'),
        size = window.innerHeight,
        itemSize = document.querySelector('.form-modal__item'),
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
    sizingItem().classList.remove('form-modal--active');
    changeBtnSign();
}
