const burgerButton = document.querySelector('.burger');
const smallMenu = document.querySelector('.small-menu');
const subjSelect = document.querySelector('#subj');
const genreSelect = document.querySelector('#genre');
const gradeSelect = document.querySelector('#grade');
const coursesList = document.querySelector('.courses-list');
const switchPriceButton = document.querySelector('.switch-price');

const info = {"data":""};

function createCard(element) {
    const li = document.createElement('li');
    const imgWrapper = document.createElement('div');
    const img = document.createElement('img');
    const cardDescription = document.createElement('div');
    const subject = document.createElement('p');
    const grade = document.createElement('p');
    const genre = document.createElement('p');
    const link = document.createElement('a');
    const price = document.createElement('a');
    imgWrapper.appendChild(img);
    img.setAttribute('src', 'src/card-img.jpeg');
    img.setAttribute('alt', `${element.title}`);
    subject.innerHTML = element.subject;
    const difGrade = element.grade.split(';');
    const difGradeLast = difGrade.length - 1; 
    if (difGrade.length > 1) {
        grade.innerHTML = `${difGrade[0]}-${difGrade[difGradeLast]} класс`;
    } else {
        grade.innerHTML = `${difGrade} класс`;
    }
    genre.innerHTML = element.genre;
    link.innerHTML = 'Подробнее';
    link.setAttribute('href', `${element.shopUrl}`);
    price.innerHTML = element.price;
    price.setAttribute('href', '#');
    cardDescription.appendChild(subject);
    cardDescription.appendChild(grade);
    cardDescription.appendChild(genre);
    cardDescription.appendChild(link);
    cardDescription.appendChild(price);
    li.appendChild(imgWrapper);
    li.appendChild(cardDescription);
    li.classList.add('card'); 
    img.classList.add('card-img'); 
    cardDescription.classList.add('card-description'); 
    grade.classList.add('card-mg'); 
    genre.classList.add('card-genre'); 
    link.classList.add('card-link', 'card-mg');
    price.classList.add('card-price');
    coursesList.appendChild(li); 
    switchPrice(price, element);   
}

function switchPrice(price, element) {
    switchPriceButton.addEventListener('click', function() { 
        if (price.innerHTML == element.price) {
            price.innerHTML = element.priceBonus;
        } else {
            price.innerHTML = element.price;
        }
    });
}

function createOptions(element) {
    const optionSubject = document.createElement('option');
    optionSubject.innerHTML = element.subject;
    subjSelect.appendChild(optionSubject);
    const optionGenre = document.createElement('option');
    optionGenre.innerHTML = element.genre;
    genreSelect.appendChild(optionGenre);
    removeDuplicateOptions('#subj');
    removeDuplicateOptions('#genre');
}

function createGradeOptions() {
    for (let i = 1; i <= 11; i++) {
        const optionGrade = document.createElement('option');
        optionGrade.value = i;
        optionGrade.innerText = i;
        gradeSelect.appendChild(optionGrade); 
    };   
}

function removeDuplicateOptions(select) {
    const options = [];
    document.querySelectorAll(`${select} > option`).forEach((option) => {
        if (options.includes(option.value)) {
            option.remove();
        } else {
            options.push(option.value);
        }
    });
}

burgerButton.addEventListener('click', function() { 
    if (smallMenu.classList.contains('appear')) {
        smallMenu.classList.remove('appear');
    } else {
        smallMenu.classList.add('appear');
        smallMenu.classList.add('small-menu__show');
    }
});

function filterCardsSubj(items) {
    subjSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val !== 'all') {
            coursesList.innerHTML = '';
            let newItems = items.filter(el => el.subject === val);
            newItems.forEach(element => {
                createCard(element);
            }); 
        } else {
            coursesList.innerHTML = '';
            items.forEach(element => {
                createCard(element);
            }); 
        }        
    });
}

function filterCardsGenre(items) {
    genreSelect.addEventListener('change', (e) => {
        e.preventDefault();
        const val = e.target.value;
        if (val !== 'all') {
            coursesList.innerHTML = '';
            let newItems = items.filter(el => el.genre === val);
            newItems.forEach(element => {
                createCard(element);
            }); 
        } else {
            coursesList.innerHTML = '';
            items.forEach(element => {
                createCard(element);
            }); 
        }        
    });
}

function filterCardsGrade(items) {

    const difGrade = element.grade.split(';');
    const difGradeLast = difGrade.length - 1; 
    if (difGrade.length > 1) {
        grade.innerHTML = `${difGrade[0]}-${difGrade[difGradeLast]} класс`;
    } else {
        grade.innerHTML = `${difGrade} класс`;
    }

    gradeSelect.addEventListener('change', (e) => {
        e.preventDefault();
        const val = e.target.value;
        if (val !== 'all') {
            coursesList.innerHTML = '';
            let newItems = items.filter(el => {
                el.grade.split(';').forEach(elem => {
                    elem === val
                });
            });
            newItems.forEach(element => {
                createCard(element);
            }); 
        } else {
            coursesList.innerHTML = '';
            items.forEach(element => {
                createCard(element);
            }); 
        }        
    });
}

fetch('https://krapipl.imumk.ru:8443/api/mobilev1/update', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(info)
}).then(response => response.json())
    .then(data => {
        let items = data.items;
        console.log(items);
        items.forEach(element => {
            createOptions(element);
            createCard(element);
        }); 
        filterCardsSubj(items);
        filterCardsGenre(items);
        //filterCardsGrade(items);
    })
    .catch(error => {
        console.log(`Произошла ошибка: ${error.message}`);
    });

createGradeOptions();