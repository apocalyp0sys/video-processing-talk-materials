import './style.css'
import {setupLogoCompositor} from "./logo-compositor.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <video id="videoOne"></video>
    <video id="videoTwo"></video>
  </div>
`

setupLogoCompositor();

