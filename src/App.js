import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import NotFound from "./pages/NotFound/NotFound";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Mats from "./pages/Mats/Mats";
import MainWrapper from "./components/MainWrapper/MainWrapper";
import { Route, Switch } from "react-router-dom";
import { routes } from "./routes";
function App() {
  console.log(routes.home);
  return (
    <>
      <Header />
      <MainWrapper>
        <Switch>
          <Route path={routes.home} component={Home} exact />
          <Route path={routes.mats} component={Mats} exact />
          <Route path="/products/:slug" exact component={SingleProduct}></Route>
          <Route path={routes.contact} component={Contact} />
          <Route path={routes.login} component={Login} />
          <Route path={routes.signUp} component={SignUp} />
          <Route component={NotFound} />
        </Switch>
      </MainWrapper>
      <Footer />
    </>
  );
}

export default App;
