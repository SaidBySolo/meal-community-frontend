// 로그아웃 버튼 기능 구현, 세션 삭제
import { Button as RadixButton } from "@radix-ui/themes"
import { requestLogout } from "../api"

function LogoutButton(){
    const handleLogout = async () => {
        
        console.log("로그아웃 버튼 눌림");

        sessionStorage.removeItem("access_token");

        try {
            await requestLogout();
        } catch (err) {
            console.error("로그아웃 실패:", err);
            return;  // 오류 발생 시, 이동하지 않도록 막기
        }
        
        window.location.href = "/MainPage";
};

    return (
        <p>
            <RadixButton radius="full" variant="soft" onClick={handleLogout}>
                로그아웃 버튼
            </RadixButton>
        </p>
    )
}

export default LogoutButton