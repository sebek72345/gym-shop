import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Switch } from "react-router-dom";
import { routes } from "./routes";
function App() {
  console.log(routes.home);
  return (
    <>
      <Header />
      <Switch>
        <Route path={routes.home} component={Home} exact />
        <Route path={routes.contact} component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
