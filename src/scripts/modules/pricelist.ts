import axios from 'axios';
import Twig, { Template } from 'twig';

import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  DEPTS_KEY,
  SUBDEPTS_KEY,
  GROUPS_KEY,
  PRICELIST_KEY,
  CONFIG_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY
} from '../utils/constants';
import type {
  TCustomData,
  TItemData,
  TDeptData,
  TSubdeptData,
  TGroupData,
  TPricelistData
} from '../utils/types';

import handleDepts from '../utils/depts';
import handleSubdepts from '../utils/subdepts';
import handleGroups from '../utils/groups';
import handlePricelist from '../utils/pricelist';

type TPricelistOptions = {
  data: string[][];
  tplPath: string;
  wrapper: Element;
};

/**
 * Рендеринг списка услуг
 */
class Pricelist {
  config: TCustomData<boolean>;
  itemsData: TCustomData<number[]>;
  keys: string[];
  tplPath: string;
  wrapper: Element;
  depts: TDeptData[];
  subdepts: TSubdeptData[];
  groups: TGroupData[];
  pricelist: TPricelistData[];

  constructor(options: TPricelistOptions) {
    this.keys = [DEPTS_KEY, SUBDEPTS_KEY, GROUPS_KEY, PRICELIST_KEY];

    this.init(options);
  }

  /**
   * Инициализация компонента
   */
  init(options: TPricelistOptions) {
    const { data, tplPath, wrapper } = options;

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
    this.tplPath = tplPath;
    this.wrapper = wrapper;
    this.depts = [];
    this.subdepts = [];
    this.groups = [];
    this.pricelist = [];

    this.handleData();
  }

  /**
   * Отрисовка данных на странице
   */
  renderData(tpl: Template) {
    const parser = new DOMParser();
    const groups = this.groups.map(item => ({
      ...item,
      [PRICELIST_KEY]: this.pricelist.filter(data => data[GROUP_KEY] === item[ID_KEY])
    }));
    const subdepts = this.subdepts.map(item => ({
      ...item,
      [GROUPS_KEY]: this.config[IS_GROUP_USED_KEY]
        ? groups.filter(data => data[SUBDEPT_KEY] === item[ID_KEY])
        : this.config[IS_GROUP_IGNORED_KEY]
            ? []
            : groups.filter(data => data[SUBDEPT_KEY] === item[ID_KEY]),
      [PRICELIST_KEY]: this.config[IS_GROUP_USED_KEY]
        ? this.pricelist.filter(data => data[GROUP_KEY] === 0 && data[SUBDEPT_KEY] === item[ID_KEY])
        : this.config[IS_GROUP_IGNORED_KEY]
          ? this.pricelist.filter(data => data[SUBDEPT_KEY] === item[ID_KEY])
          : this.pricelist.filter(data => data[GROUP_KEY] === 0 && data[SUBDEPT_KEY] === item[ID_KEY])
    }));
    const { body } = parser.parseFromString(
      tpl.render({ list: subdepts }),
      'text/html'
    );

    // console.log(subdepts);
    this.wrapper.append(body.querySelector('.js-price-list') as Node);
  }

  /**
   * Проверка существования параметра
   */
  isParamExist(data: TItemData, key: string): TItemData {
    return data[key] !== undefined
      ? { [key]: key === PRICE_KEY ? `${data[PRICE_KEY]} руб.` : data[key] }
      : {};
  }

  /**
   * Обработка данных выборки
   */
  setData(key: string, arr: TItemData[]) {
    return arr.map(item => ({
      [ID_KEY]: item[ID_KEY],
      [NAME_KEY]: item[NAME_KEY],
      ...this.isParamExist(item, PRICE_KEY),
      ...this.isParamExist(item, SUBDEPT_KEY),
      ...this.isParamExist(item, GROUP_KEY),
      ...(key === SUBDEPTS_KEY && { [GROUPS_KEY]: [] as TGroupData[] }),
      ...((key === SUBDEPTS_KEY || key === GROUPS_KEY) && { [PRICELIST_KEY]: [] as TPricelistData[] })
    }));
  }

  /**
   * Получение данных элементов по их идентификаторам
   */
  async fetchData(payload: TCustomData<number[]>): Promise<boolean | undefined> {
    try {
      // keys.map(type => axios.get(`${API_URL}${type}`))
      let isSucceed = false;
      const response = await Promise.all([
        handleDepts(),
        handleSubdepts(),
        handleGroups(),
        handlePricelist()
      ]);
      const isResSucceed: boolean = response.reduce((acc: boolean, { success }: { success: boolean; }) => acc && success, true);
      const items: TItemData[][] = response.map(({ data }: { data: TItemData[]; }) => data);

      if(isResSucceed) {
        this.keys.forEach(
          (key, index) => this[key] = this.setData(
            key,
            items[index].filter(item => payload[key].includes(item[ID_KEY] as number))
          )
        );
      }

      return !isSucceed;
    } catch(err) {
      console.error(err);
    }
  }

  /**
   * Получение разметки шаблона
   */
  async fetchTemplate(): Promise<Template | undefined> {
    try {
      const res = await fetch(this.tplPath);
      const data = await res.text();

      return Twig.twig({ data });
    } catch(err) {
      console.error(err);
    }
  }

  /**
   * Обработка массива идентификаторов
   */
  async handleData() {
    try {
      const [isSucceed, tpl] = await Promise.all([
        this.fetchData(this.itemsData),
        this.fetchTemplate()
      ]);

      if(isSucceed) {
        this.renderData(tpl as Template);
      }
    } catch(err) {
      console.error(err);
    }
  }
}

export default Pricelist;
