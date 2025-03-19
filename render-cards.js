const cardsData = [
  {
    inStock: true,
    imgUrl: 'choco.jpg',
    text: 'Шоколадное',
    price: 310,
    isHit: true,
    specialOffer: 'Сироп бесплатно!'
  },
  {
    inStock: false,
    imgUrl: 'lemon.jpg',
    text: 'Лимонное',
    price: 125,
    isHit: false
  },
  {
    inStock: true,
    imgUrl: 'cowberry.jpg',
    text: 'Брусничное',
    price: 170,
    isHit: false
  },
  {
    inStock: true,
    imgUrl: 'cookie.jpg',
    text: 'С печеньем',
    price: 250,
    isHit: false
  },
  {
    inStock: true,
    imgUrl: 'creme-brulee.jpg',
    text: 'Крем-брюле',
    price: 190,
    isHit: false
  }
];
const makeElement = (tagName, attributes = {}) => {
  try {
    const element = document.createElement(tagName);
    for (const [key, value] of Object.entries(attributes)) {
      if (key === 'text') {
        element.textContent = value;
      } else {
        element.setAttribute(key, value);
      }
    }
    return element;
  } catch (e) {
    console.error(`makeElement err: ${e.message}`);
    return null;
  }
}

const createGood = (card) => {
  try {
    if (!card || typeof card !== 'object' || Array.isArray(card) || Object.keys(card).length === 0) {
      throw new Error('Invalid card data');
    }
    const good = makeElement('li', {class: 'good'});
    if (!good) return null;
    good.classList.add(card.inStock 
      ? 'good--available' 
      : 'good--unavailable');
    const title = makeElement('h2', {class: 'good__description', text: card.text});
    const image = makeElement('img', {class: 'good__image', src: card.imgUrl, alt: card.text});
    const price = makeElement('p', {class: 'good__price', text: `${card.price}₽/кг`});
    good.append(title, image, price);
    if (card.isHit) {
      good.classList.add('good--hit');
      const specialOffer = makeElement('p', {class: 'good__special-offer', text: card.specialOffer});
      good.append(specialOffer);
    }
    return good;
  } catch (e) {
    console.error(`createGood err: ${e.message}`);
    return null;
  }
}

const renderCards = (cardsData) => {
  try {
    if (!Array.isArray(cardsData) || !cardsData.length) {
      throw new Error('Invalid cardsData');  
    }
    const goodsList = document.querySelector('.goods');
    if (!goodsList) {
      throw new Error('goodsList element not found');
    }
    const fragment = document.createDocumentFragment();
    cardsData.forEach((card) => {
      const good = createGood(card);
      if (good) {
        fragment.append(good);
      }
    });
    goodsList.append(fragment);
  } catch (e) {
    console.error(`renderCards err: ${e.message}`);
  } 
}

renderCards(cardsData);
