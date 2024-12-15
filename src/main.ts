import './styles/style.css';
import initPriceRenderer from './scripts/app.ts';

/*
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div
    class="price-wrapper js-price-wrapper"
    data-depts="[4]"
    data-subdepts="[10004645]"
    data-groups="[5380]"
    data-pricelist="[5377,12501,5378,12502,5379,20013,5381,5383,19733,5382,19384,8121,5388,25011,5386,5385,5387]"
    data-config="isComplexData:true,isGroupIgnored:false,isGroupUsed:false"
    data-path="assets/app/pricelist/tpl.twig"
  ></div>
`
*/

initPriceRenderer();
