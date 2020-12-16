import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import NotFound from "./pages/NotFound/NotFound";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Mats from "./pages/Mats/Mats";
import MachineAttachments from "./pages/MachineAttachment/MachineAttachment";
import Hygiene from "./pages/Hygiene/Hygiene";
import MeasurementTools from "./pages/MeasurementTools/MeasurementTools";
import MainWrapper from "./components/MainWrapper/MainWrapper";
import CartPage from "./pages/CartPage/CartPage";
import AboutUs from "./pages/AboutUs/AboutUs";
import { routes } from "./routes";

function App() {
  return (
    <>
      <Header />
      <MainWrapper>
        <Switch>
          <Route path={routes.home} component={Home} exact />
          <Route path={routes.mats} component={Mats} exact />
          <Route
            path={routes.machineAttachments}
            component={MachineAttachments}
          />
          <Route path={routes.hygiene} component={Hygiene} exact />
          <Route path={routes.measurmentTools} component={MeasurementTools} />
          <Route path="/products/:slug" component={SingleProduct} />
          <Route path={routes.contact} component={Contact} />
          <Route path={routes.login} component={Login} />
          <Route path={routes.signUp} component={SignUp} />
          <Route path={routes.cart} component={CartPage} />
          <Route path={routes.aboutUs} component={AboutUs} />
          <Route path={routes.deliver} component={AboutUs} />
          <Route path={routes.termsConditions} component={AboutUs} />
          <Route component={NotFound} />
        </Switch>
      </MainWrapper>
      <Footer />
    </>
  );
}

export default App;
