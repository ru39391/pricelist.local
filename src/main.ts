import './styles/style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from '/vite.svg'
import initPriceRenderer from './scripts/app.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="price-wrapper js-price-wrapper" data-depts="[4]" data-subdepts="[10052528]" data-groups="[19659]" data-pricelist="[19660,19661,19662,19663,19664,19665,19666,19667,19668,19669,19670,19671,19672,19673,19674,19675,19736]" data-config="isComplexData:false,isGroupIgnored:false,isGroupUsed:true"></div>
  </div>
`

initPriceRenderer();
