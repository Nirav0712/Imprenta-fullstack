import Background from "./components/Background";
import AppRoutes from "./routes/AppRoutes";
import ThemeProvider from "./components/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden">
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-right" />
            <Background />
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;