import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TypesOfCost from "./pages/TypesOfCost/TypesOfCost";
import Amount from "./pages/Amount/Amount";
import Currency from "./pages/Currency/Currency";
import PaymentMethod from "./pages/PaymentMethod/PaymentMethod";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="types-of-cost" element={<TypesOfCost />} />
          <Route path="amount" element={<Amount />} />
          <Route path="currency" element={<Currency />} />
          <Route path="payment-method" element={<PaymentMethod />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
