// 로그아웃 버튼 기능 구현, 세션 삭제
import { requestLogout } from "../api";

function LogoutButton() {
  const handleLogout = async () => {
    console.log("로그아웃 버튼 눌림");

    localStorage.removeItem("access_token");

    try {
      await requestLogout();
    } catch (err) {
      console.error("로그아웃 실패:", err);
      return; // 오류 발생 시, 이동하지 않도록 막기
    }

    window.location.href = "/";
  };

  return <p onClick={handleLogout}>로그아웃</p>;
}

export default LogoutButton;
