import "./App.css";
import DetailProduct from "./pages/DetailProduct/detailProductPage";
import HomePage from "./pages/Home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" caseSensitive={true} element={<HomePage />} />
          <Route path="/detailProduct/:id" element={<DetailProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
