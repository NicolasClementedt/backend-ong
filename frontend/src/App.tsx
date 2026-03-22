import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ItemsPage from "./pages/items/ItemsPage";
import TransactionsPage from "./pages/transaction/TransactionsPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Navbar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </BrowserRouter>
  );
}

export default App;
