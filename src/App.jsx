import AuthProvider from 'context/auth/auth.provider';
import LocationProvider from 'context/location/location.provider';
import Navigation from 'navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LocationProvider>
          <Navigation />
        </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
