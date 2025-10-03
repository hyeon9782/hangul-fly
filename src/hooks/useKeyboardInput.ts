import { useEffect, useState } from "react";

export function useKeyboardInput() {
  const [input, setInput] = useState("");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Enter: 제출
      if (e.key === "Enter") {
        if (input.trim()) {
          // 제출 이벤트 발생 (나중에 게임 로직과 연결)
          console.log("제출:", input);
          setInput("");
        }
        return;
      }

      // Backspace: 삭제
      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        return;
      }

      // 한글 입력만 허용
      if (e.key.length === 1 && /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(e.key)) {
        setInput((prev) => prev + e.key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  return { input, setInput };
}
