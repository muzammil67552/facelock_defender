import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailSetup from "@/components/EmailSetup";
import Login from "@/components/Login";
import CapturePhoto from "@/components/CapturePhoto";
import { setEmail as saveEmail, getPassword } from "@/utils/storage";

const Index = ({ emailSet, onEmailSet }) => {
  const [showCapture, setShowCapture] = useState(false);
  const navigate = useNavigate();
  const correctPassword = getPassword();

  const handleEmailSet = (email) => {
    saveEmail(email);
    onEmailSet(email);
  };

  const handleLoginSuccess = () => {
    navigate('/access-granted');
  };

  const handleLoginFailure = () => {
    setShowCapture(true);
  };

  const handleCaptureDone = (photo) => {
    setShowCapture(false);
    if (photo) {
      navigate('/intruder-detected', { state: { photo } });
    }
  };

  if (!emailSet) {
    return <EmailSetup onEmailSet={handleEmailSet} />;
  }

  return (
    <>
      <Login 
        correctPassword={correctPassword}
        onLoginSuccess={handleLoginSuccess}
        onLoginFailure={handleLoginFailure}
      />
      {showCapture && <CapturePhoto onCaptureDone={handleCaptureDone} />}
    </>
  );
};

export default Index;
