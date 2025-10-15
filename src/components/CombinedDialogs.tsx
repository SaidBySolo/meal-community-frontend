import { useState } from "react";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import { Button } from "@radix-ui/themes";

const CombinedDialogs = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);


  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setTimeout(() => {
      setIsRegisterOpen(true);
    }, 200)
  }

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setTimeout(() => {
      setIsLoginOpen(true);
    }, 200);
  }
  return (
    <>
      <LoginDialog
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterDialog
        open={isRegisterOpen}
        onOpenChange={setIsRegisterOpen}
        onRevert={handleSwitchToLogin}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <Button onClick={() => setIsLoginOpen(true)}>로그인 하여 알아보기</Button>
    </>
  )
}

export default CombinedDialogs;