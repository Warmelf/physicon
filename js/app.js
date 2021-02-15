const coursesList = document.querySelector('.courses-list');
const switchPriceButton = document.querySelector('.switch-price');
const burgerButton = document.querySelector('.burger');
const smallMenu = document.querySelector('.small-menu');

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
    grade.innerHTML = `${element.grade} класс`;
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
    link.classList.add('card-link');
    link.classList.add('card-mg');
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

fetch('https://krapipl.imumk.ru:8443/api/mobilev1/update', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(info)
}).then(response => response.json())
    .then(data => {
        console.log(data);
        let items = data.items;
        console.log(items);
        items.forEach(element => {
            createCard(element);
        });
        // let arrOfUsedValue = ['RUB', 'USD', 'EUR', 'GBP'];
        // keysOfObj = keysOfObj.filter(item => !arrOfUsedValue.includes(item));
        // keysOfObj.forEach(el => {
        //     select.forEach(elem => {
        //         option = document.createElement('option');
        //         option.innerHTML = el;
        //         elem.appendChild(option);
        //         option.setAttribute('value', el);
        //     });                   
        // });  
    })
    .catch(error => {
        console.log(`Произошла ошибка: ${error.message}`);
    });

burgerButton.addEventListener('click', function() { 
    if (smallMenu.classList.contains('appear')) {
        smallMenu.classList.remove('appear');
    } else {
        smallMenu.classList.add('appear');
        smallMenu.classList.add('small-menu__show');
    }
})