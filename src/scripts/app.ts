/**
 * Зависимости
 */
import Pricelist from './modules/pricelist';

/**
 * Инициализация методов обработки списка услуг
 */
const initPriceRenderer = () => {
  const priceWrapper = document.querySelector('.js-price-wrapper') as HTMLElement;

  if(!priceWrapper) {
    return;
  }

  const { path } = priceWrapper.dataset;
  const pricelist = new Pricelist({
    data: Object.entries(priceWrapper.dataset) as string[][],
    tplPath: path as string,
    wrapper: priceWrapper
  });

  return pricelist;
}

export default initPriceRenderer;
