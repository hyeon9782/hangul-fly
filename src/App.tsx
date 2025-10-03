import { useState } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { useKeyboardInput } from "./hooks/useKeyboardInput";

function App() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targetWord] = useState("한글날");

  const { input } = useKeyboardInput();

  function handleStart() {
    setIsPlaying(true);
    setScore(0);
    setCombo(0);
    setTimeLeft(60);
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 3D 캔버스 */}
      <div className="absolute inset-0">
        <GameCanvas targetWord={targetWord} />
        {/* <HangulGame /> */}
      </div>

      {/* UI 오버레이 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 상단 HUD */}
        <div className="flex justify-between items-start p-6">
          {/* 타이머 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-blue-500">
            <div className="text-white text-sm font-medium mb-1">시간</div>
            <div className="text-white text-3xl font-bold">{timeLeft}초</div>
          </div>

          {/* 점수 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-purple-500">
            <div className="text-white text-sm font-medium mb-1">점수</div>
            <div className="text-white text-3xl font-bold">{score}</div>
          </div>

          {/* 콤보 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-yellow-500">
            <div className="text-white text-sm font-medium mb-1">콤보</div>
            <div className="text-white text-3xl font-bold">×{combo}</div>
          </div>
        </div>

        {/* 타겟 단어 표시 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black/70 backdrop-blur-md rounded-2xl px-8 py-4 border-2 border-white/30">
            <div className="text-white/70 text-sm font-medium mb-2 text-center">
              타겟 단어
            </div>
            <div className="text-white text-5xl font-bold tracking-wider">
              {targetWord}
            </div>
          </div>
        </div>

        {/* 하단 입력창 */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-2xl mx-auto">
            {/* 입력 표시 */}
            <div className="bg-black/70 backdrop-blur-md rounded-2xl px-8 py-6 border-2 border-green-500 shadow-2xl">
              <div className="text-white/70 text-sm font-medium mb-3">
                입력 중...
              </div>
              <div className="text-white text-4xl font-bold min-h-[60px] flex items-center">
                {input || (
                  <span className="text-white/30">키보드로 입력하세요</span>
                )}
              </div>
              <div className="text-white/50 text-sm mt-4 text-center">
                Enter: 제출 | Backspace: 삭제
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 게임 설명 (처음 화면) */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-md rounded-3xl p-12 max-w-2xl border-2 border-white/20 shadow-2xl">
            <h1 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              한글 플라이
            </h1>
            <p className="text-white/90 text-xl mb-8 text-center leading-relaxed">
              3D 공간에서 날아다니는 자음과 모음을 보고
              <br />
              키보드로 단어를 입력하세요!
            </p>
            <div className="space-y-4 text-white/80 text-lg mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>파란색 = 자음 (ㄱ, ㄴ, ㄷ...)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span>빨간색 = 모음 (ㅏ, ㅓ, ㅗ...)</span>
              </div>
            </div>

            {/* 게임 시작 버튼 */}
            <div className="text-center">
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-xl px-12 py-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                게임 시작
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
