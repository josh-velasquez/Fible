import { Provider } from "react-redux";
import { store } from "../state";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chef from "./Chef";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Chef />
        {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chef />} />
          </Routes>
        </BrowserRouter> */}
      </div>
    </Provider>
  );
};
export default App;
