import { createRoot } from 'react-dom/client';

function Options() {
  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '20px' }}>FB Enhancer — Settings</h1>
      <p style={{ color: '#666' }}>Full settings UI coming in Sprint 14</p>
    </div>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<Options />);
}
