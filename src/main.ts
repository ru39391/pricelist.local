import './styles/style.css';
import initPriceRenderer from './scripts/app.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="price-wrapper js-price-wrapper" data-depts="[4]" data-subdepts="[10052528]" data-groups="[19659]" data-pricelist="[19660,19661,19662,19663,19664,19665,19666,19667,19668,19669,19670,19671,19672,19673,19674,19675,19736]" data-config="isComplexData:false,isGroupIgnored:false,isGroupUsed:false"></div>
`

initPriceRenderer();
