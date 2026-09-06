/**
 * axq-app-{{name}} — Entry point
 * AXQ Design · https://axqdesign.axq
 */
import '@axqdesign/tokens/css';
import './styles.css';

const app = document.getElementById('app')!;
app.innerHTML = `
  <main style="
    background: var(--axq-bg-primary);
    color: var(--axq-text-primary);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: system-ui, sans-serif;
    font-size: var(--axq-type-body);
  ">
    <h1 style="font-size: var(--axq-type-h3);">
      ✦ {{name}}
    </h1>
  </main>
`;
