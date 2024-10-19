/**
 * Зависимости
 */
import Pricelist from './modules/pricelist';

/**
 * Инициализация методов обработки списка услуг
 */
const initPriceRenderer = () => {
  const priceWrapper = document.querySelector('.js-price-wrapper');

  if(!priceWrapper) {
    return;
  }

  const pricelist = new Pricelist({
    data: Object.entries(priceWrapper.dataset),
    wrapper: priceWrapper
  });
}

export default initPriceRenderer;
