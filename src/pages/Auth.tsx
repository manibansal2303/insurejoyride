import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { signInWithGoogle } from "@/integrations/azure/client";
import { useNavigate } from "react-router-dom";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "@/firebase/firebase";

export default function Auth() {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
      try {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: () => console.log("Recaptcha verified"),
        });
      }
      catch(e)
      {
        console.log('error => ', e);
      }
  }, []);

  const sendOTP = async () => {
      try {
          const confirmationResult = await signInWithPhoneNumber(auth, contact, (window as any).recaptchaVerifier);
          setConfirmation(confirmationResult);
          alert("OTP sent to your contact");
          signIn();
      } catch (error) {
          alert(error.message);
      }
  };

  const verifyOTP = async () => {
      try {
          await confirmation.confirm(otp);
          alert("OTP Verified! Logged in successfully.");
      } catch (error) {
          alert("Invalid OTP");
      }
  };

  const navigate = useNavigate();

  const signIn = () => {
    navigate("/")
    console.log("Sign in clicked");
  };
  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Redirect to ForgotPassword page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center">Welcome</h2>
          <p className="text-center text-gray-500">Sign in to your travel insurance account</p>

          <Tabs defaultValue="user" className="mt-4">
            <TabsList className="flex justify-center mb-4">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="agent">Agent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="user">
              <Input type="text" placeholder="Email or Phone Number" className="mb-2" value={contact} onChange={(e) => setContact(e.target.value)} />
              <div className="flex space-x-2">
                <Input type="text" placeholder="Enter OTP" className="flex-1" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <Button onClick={sendOTP}>Get OTP</Button>
                <div id="recaptcha-container"></div>
              </div>
              <Button className="w-full mt-4" onClick= { () => {verifyOTP();}}>Sign In</Button>
              <div className="flex flex-col space-y-2 mt-4">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <FaGoogle onClick={signInWithGoogle} className="mr-2" /> Sign in with Google
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="agent">
              <Input type="text" placeholder="Username (Email or Phone)" className="mb-2" />
              <Input type="password" placeholder="Password" className="mb-2" />
              <div className="flex justify-between text-sm mb-2">
                <a href="#" className="text-blue-500" onClick={handleForgotPassword}>Forgot Password?</a>
              </div>
              <Button className="w-full" onClick={() => { signIn(); }}>Sign In</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
