import type { TItemData } from './types';

const sortArr = (arr: TItemData[], key: string): TItemData[] => {
  const handleValue = (value: string | number): number => Boolean(value) ? Number(value) : 0;

  return arr.sort((a, b) => {
    const valueA = handleValue(a[key]);
    const valueB = handleValue(b[key]);

    if(valueA < valueB) {
      return -1;
    }
    if(valueA > valueB) {
      return 1;
    }
    return 0;
  });
};

export {
  sortArr
};
