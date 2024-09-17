import { Routes, Route } from "react-router-dom";
import "./globals.css";
import AuthLayout from "./auth/AuthLayout";
import SigninForm from "./auth/forms/SigninForm";
import SignupForm from "./auth/forms/SignupForm";
import RootLayout from "./root/RootLayout";
import { Home } from "./root/pages";
import { Toaster } from "@/components/ui/toaster"



const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout/>}>
          <Route path="/sign-in" element={<SigninForm/>}/>
          <Route path="/sign-up" element={<SignupForm/>}/>
        </Route>
        


        {/* Private Routes */}
        <Route element={<RootLayout/>}>
          <Route index element={<Home/>}/>
        </Route>
        
      </Routes>
      <Toaster/>
    </main>
  );
};

export default App;
