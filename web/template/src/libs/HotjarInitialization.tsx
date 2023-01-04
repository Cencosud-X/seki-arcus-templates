import { hotjar } from 'react-hotjar';
import secrets from '../config/secrets'

hotjar.initialize(secrets.HOTJAR_ID, secrets.HOTJAR_SNIPPET_VERSION);

// Identify the user
hotjar.identify('USER_ID', { userProperty: 'value' });

// Add an event
hotjar.event('button-click');

// Update SPA state
hotjar.stateChange('/my/page');

// Check if Hotjar has been initialized before calling its methods
if (hotjar.initialized()) {
  hotjar.identify('USER_ID', { userProperty: 'value' });
}