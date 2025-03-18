import { Fragment } from "react";
import Header from "./components/Header/Header";
import Productlist from "./components/Productlist/Productlist";
import "./styles.scss";

function App() {
  return (
    <Fragment>
      <div className="chat-app">
        <Header />
        <Productlist />
      </div>
    </Fragment>
  );
}

export default App;