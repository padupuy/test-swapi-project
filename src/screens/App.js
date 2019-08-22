import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { AppLayout, GlobalStyle, Loader } from 'components';
// import Home from 'screens/home';

const loadCharactersPage = () => import('screens/characters');
const Characters = React.lazy(loadCharactersPage);
const loadCharacterPage = () => import('screens/character');
const Character = React.lazy(loadCharacterPage);
const loadVehiclesPage = () => import('screens/vehicles');
const Vehicles = React.lazy(loadVehiclesPage);
const loadVehiclePage = () => import('screens/vehicle');
const Vehicle = React.lazy(loadVehiclePage);

function App() {
  // pre-load the other screens
  React.useEffect(() => {
    loadCharactersPage();
    loadCharacterPage();
    loadVehiclesPage();
    loadVehiclePage();
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <AppLayout>
          <React.Suspense fallback={<Loader />}>
            <Switch>
              {/* <Route exact path={'/'} component={Home} /> */}
              <Route exact path={'/characters'} component={Characters} />
              <Route path={'/characters/:id'} component={Character} />
              <Route exact path={'/vehicles'} component={Vehicles} />
              <Route path={'/vehicles/:id'} component={Vehicle} />
              <Route path="*" render={() => <Redirect to={'/characters'} />} />
            </Switch>
          </React.Suspense>
        </AppLayout>
      </Router>
    </React.Fragment>
  );
}

export default App;
