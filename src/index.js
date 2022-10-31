import { registerRootComponent } from 'expo';
import { AppWithContext } from './app/App'

// This line, along with the referece to this file in app.json,
// allows us to register this component as the app root. 
export default registerRootComponent(AppWithContext);
