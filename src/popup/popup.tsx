import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { logger } from '@core/logger/logger';
import { messagingService } from '@core/messaging/messaging-service';

function Popup() {
  useEffect(() => {
    messagingService
      .sendToBackground({ type: 'GET_SETTINGS' })
      .catch((err) => logger.error('Failed to contact background', err));
  }, []);

  return (
    <div style={{ padding: '16px', minWidth: '300px' }}>
      <h1 style={{ fontSize: '16px', margin: '0 0 8px' }}>FB Enhancer</h1>
      <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Full UI coming in Sprint 4</p>
    </div>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<Popup />);
}
