import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  DEPTS_KEY,
  SUBDEPTS_KEY,
  GROUPS_KEY,
  PRICELIST_KEY
} from '../utils/constants';

export type TCustomData<T> = {
  [x: string]: T;
}

export type TItemData = TCustomData<string | number>;

export type TPricelistKeys = typeof DEPTS_KEY | typeof SUBDEPTS_KEY | typeof GROUPS_KEY | typeof PRICELIST_KEY;

export type TPricelistData = {
  [ID_KEY]: number;
  [NAME_KEY]: string;
  [PRICE_KEY]: string;
  [SUBDEPT_KEY]: number;
  [GROUP_KEY]: number;
}

export type TGroupData = {
  [ID_KEY]: number;
  [NAME_KEY]: string;
  [SUBDEPT_KEY]: number;
  [PRICELIST_KEY]: TPricelistData[];
}

export type TSubdeptData = {
  [ID_KEY]: number;
  [NAME_KEY]: string;
  [GROUPS_KEY]: TGroupData[];
  [PRICELIST_KEY]: TPricelistData[];
}

export type TDeptData = {
  [ID_KEY]: number;
  [NAME_KEY]: string;
}
