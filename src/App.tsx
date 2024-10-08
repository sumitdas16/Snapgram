import { Routes, Route } from "react-router-dom";
import "./globals.css";
import AuthLayout from "./auth/AuthLayout";
import SigninForm from "./auth/forms/SigninForm";
import SignupForm from "./auth/forms/SignupForm";
import RootLayout from "./root/RootLayout";
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from "./root/pages";
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
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/saved" element={<Saved/>}/>
          <Route path="/all-users" element={<AllUsers/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:id" element={<EditPost/>}/>
          <Route path="/posts/:id" element={<PostDetails/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
        </Route>
        
      </Routes>
      <Toaster/>
    </main>
  );
};

export default App;
