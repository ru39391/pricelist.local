import axios from 'axios';

import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  DEPTS_KEY,
  SUBDEPTS_KEY,
  GROUPS_KEY,
  PRICELIST_KEY,
  CONFIG_KEY
} from '../utils/constants';
import type { TCustomData } from '../utils/types';

import handleDepts from '../utils/depts';
import handleSubdepts from '../utils/subdepts';
import handleGroups from '../utils/groups';
import handlePricelist from '../utils/pricelist';

type TPricelistOptions = {
  data: string[][];
  wrapper: Element;
};

/**
 * Рендеринг списка услуг
 */
class Pricelist {
  config: TCustomData<boolean>;
  itemsData: TCustomData<number[]>;
  keys: string[];
  wrapper: Element;

  constructor(options: TPricelistOptions) {
    this.keys = [DEPTS_KEY, SUBDEPTS_KEY, GROUPS_KEY, PRICELIST_KEY];

    this.init(options);
  }

  /**
   * Инициализация компонента
   */
  init(options: TPricelistOptions) {
    const { data, wrapper } = options;

    if (!data) {
      console.error('Данные для рендеринга не определены');
      return;
    }

    this.config = Object.fromEntries(data)[CONFIG_KEY].split(',').reduce(
      (acc: TCustomData<boolean>, item: string) => ({
        ...acc,
        [item.split(':')[0]]: JSON.parse(item.split(':')[1])
      }), {}
    );
    this.itemsData = this.keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: JSON.parse(Object.fromEntries(data)[key])
      }), {}
    );
    this.wrapper = wrapper;
    this.depts = [];
    this.subdepts = [];
    this.groups = [];
    this.pricelist = [];

    this.handleData();
  }

  renderData() {
    console.log(this);
    const ul = document.createElement('ul');
    const pricelistElements = this.pricelist.map(item => {
      const el = document.createElement('li');

      el.textContent = `${item[NAME_KEY]}: ${item[PRICE_KEY].toString()} руб.`;
      return el;
    });

    pricelistElements.forEach(el => ul.append(el));

    this.wrapper.append(ul);
  }

  /**
   * Присвоение данных выборки
   */
  setData(data) {
    this.keys.forEach((key) => this[key] = data[key]);
  }

  /**
   * Получение данных элементов по их идентификаторам
   */
  async fetchData(payload: TCustomData<number[]>) {
    try {
      // keys.map(type => axios.get(`${API_URL}${type}`))
      let isSucceed = false;
      const response = await Promise.all([
        handleDepts(),
        handleSubdepts(),
        handleGroups(),
        handlePricelist()
      ]);
      const isResSucceed = response.reduce((acc, { success }) => acc && success, true);
      const items = response.map(({ data }) => data);

      if(isResSucceed) {
        this.setData(
          this.keys.reduce((acc, key, index) => ({
            ...acc,
            [key]: items[index].filter(item => payload[key].includes(item[ID_KEY]))
          }), {})
        );
      }

      return !isSucceed;
    } catch(err) {
      console.error(err);
    }
  }

  /**
   * Обработка массива идентификаторов
   */
  handleData() {
    this.fetchData(this.itemsData)
      .then(res => {
        if(res) {
          this.renderData();
        }
      });
  }
}

export default Pricelist;
