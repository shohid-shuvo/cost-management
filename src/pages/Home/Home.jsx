// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar"; // Sidebar component
// import Header from "../components/Header"; // Header component
// import Expenses from "../pages/Expenses"; // Dashboard page
// import TypesOfCost from "../pages/TypesOfCost";
// import Amount from "../pages/Amount";
// import Currency from "../pages/Currency";
// import PaymentMethod from "../pages/PaymentMethod";

// const Home = () => {
//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-100">
//         {/* Sidebar Section */} {/* modfy */}
//         <Sidebar />
        
//         <div className="flex flex-col flex-1 overflow-hidden">
//           {/* Header Section */} {/* modfy */}
//           <Header />
          
//           {/* Main Content Section */} {/* modfy */}
//           <main className="flex-1 p-6 overflow-auto">
//             <Routes>
//               <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Default route */} {/* modfy */}
//               <Route path="/dashboard" element={<Expenses />} />
//               <Route path="/types-of-cost" element={<TypesOfCost />} />
//               <Route path="/amount" element={<Amount />} />
//               <Route path="/currency" element={<Currency />} />
//               <Route path="/payment-method" element={<PaymentMethod />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default Home;
