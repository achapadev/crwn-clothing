import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const App = () => {
  return (
    // Routes allows this app to register these Route level components that will return specific component when it matches
    // a specific route
    <Routes>
      {/* Navigation is our parental component for Home & Shop */}
      <Route path="/" element={<Navigation />}>
        {/* index is attribute meaning match just the / at outlet level aka base component */}
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
