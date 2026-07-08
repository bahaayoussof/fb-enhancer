import { createRoot } from 'react-dom/client';
import { Popup } from '@ui/popup/Popup';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<Popup />);
}
