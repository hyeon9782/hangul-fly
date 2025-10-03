import { useState, useRef, useEffect } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { getRandomWord, type WordData } from "./data/words";

function App() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targetWordData, setTargetWordData] = useState<WordData>(() =>
    getRandomWord()
  );
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposingRef = useRef(false); // 한글 조합 중인지 체크

  const targetWord = targetWordData.word;
  const targetTheme = targetWordData.theme;

  // 게임 시작 시 input에 포커스
  useEffect(() => {
    if (isPlaying && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPlaying]);

  // 개발용: 정답 단어 콘솔 출력
  useEffect(() => {
    if (isPlaying) {
      console.log(
        "🎯 정답:",
        targetWord,
        `(${targetWord.length}글자)`,
        `[테마: ${targetTheme}]`
      );
    }
  }, [targetWord, targetTheme, isPlaying]);

  // 타이머 기능
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // 게임 종료
          setIsPlaying(false);
          setIsGameOver(true);
          setMessage("시간 종료! 게임이 끝났습니다 ⏰");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isGameOver]);

  function handleSubmit(submittedValue: string) {
    if (submittedValue === targetWord) {
      // 정답!
      const points = 100 + targetWord.length * 20 + combo * 10;
      setScore(score + points);
      setCombo(combo + 1);
      setMessage("정답입니다! 🎉");
      setInput("");

      // 다음 단어로 변경 (현재 단어 제외)
      setTimeout(() => {
        const nextWordData = getRandomWord(targetWord);
        setTargetWordData(nextWordData);
        setMessage("");
      }, 1500);

      // 포커스 유지
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // 오답
      setCombo(0);
      setMessage("틀렸습니다! 다시 시도하세요 ❌");
      setInput("");

      // 포커스 유지
      setTimeout(() => inputRef.current?.focus(), 100);

      // 메시지 2초 후 제거
      setTimeout(() => setMessage(""), 2000);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // 한글 조합 중이면 Enter를 무시
    if (e.key === "Enter" && !isComposingRef.current && input.trim()) {
      e.preventDefault();
      handleSubmit(input.trim());
    }
  }

  function handleCompositionStart() {
    isComposingRef.current = true;
  }

  function handleCompositionEnd() {
    isComposingRef.current = false;
  }

  function handleStart() {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setCombo(0);
    setTimeLeft(300);
    setMessage("");
    setInput("");
    setTargetWordData(getRandomWord()); // 게임 시작 시 새로운 단어
  }

  function handlePass() {
    // 패스 - 콤보 초기화하고 다음 단어로
    setCombo(0);
    setInput("");
    const nextWordData = getRandomWord(targetWord);
    setTargetWordData(nextWordData);
    setMessage("패스! 다음 문제입니다 ⏭️");

    setTimeout(() => {
      setMessage("");
      inputRef.current?.focus();
    }, 1000);
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 3D 캔버스 */}
      <div className="absolute inset-0">
        <GameCanvas targetWord={targetWord} />
      </div>

      {/* UI 오버레이 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 상단 HUD */}
        <div className="flex justify-between items-start p-6 gap-4">
          {/* 타이머 */}
          <div
            className={`bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 border-2 transition-colors ${
              timeLeft <= 30
                ? "border-red-500 animate-pulse"
                : timeLeft <= 60
                ? "border-yellow-500"
                : "border-blue-500"
            }`}
          >
            <div className="text-white text-sm font-medium mb-1">시간</div>
            <div
              className={`text-3xl font-bold ${
                timeLeft <= 30
                  ? "text-red-400"
                  : timeLeft <= 60
                  ? "text-yellow-400"
                  : "text-white"
              }`}
            >
              {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </div>
          </div>

          {/* 테마 & 글자 수 힌트 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-green-500">
            <div className="text-white text-sm font-medium mb-1">힌트</div>
            <div className="text-green-400 text-2xl font-bold">
              {targetTheme}
            </div>
            <div className="text-yellow-400 text-lg font-bold mt-1">
              {targetWord.length}글자
            </div>
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

          {/* 패스 버튼 */}
          <button
            onClick={handlePass}
            disabled={!isPlaying || isGameOver}
            className="pointer-events-auto bg-orange-500/80 hover:bg-orange-600 disabled:bg-gray-500/50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 border-2 border-orange-400"
          >
            <div className="text-sm mb-1">패스</div>
            <div className="text-2xl">⏭️</div>
          </button>
        </div>

        {/* 정답/오답 메시지 */}
        {message && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={`${
                message.includes("정답")
                  ? "bg-green-500/90 border-green-300"
                  : "bg-red-500/90 border-red-300"
              } backdrop-blur-md rounded-2xl px-12 py-6 border-2 shadow-2xl animate-bounce`}
            >
              <div className="text-white text-4xl font-bold text-center">
                {message}
              </div>
            </div>
          </div>
        )}

        {/* 하단 입력창 */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-2xl mx-auto">
            {/* 입력 표시 */}
            <div className="bg-black/70 backdrop-blur-md rounded-2xl px-8 py-6 border-2 border-green-500 shadow-2xl pointer-events-auto">
              <div className="text-white/70 text-sm font-medium mb-3">
                날아다니는 글자로 단어를 맞춰보세요!
              </div>
              <div className="relative">
                {/* 실제 input 요소 (숨김) */}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-default"
                  autoComplete="off"
                  disabled={!isPlaying}
                />
                {/* 표시용 div */}
                <div
                  className="text-white text-4xl font-bold min-h-[60px] flex items-center cursor-text"
                  onClick={() => inputRef.current?.focus()}
                >
                  {input || (
                    <span className="text-white/30">여기에 입력하세요...</span>
                  )}
                </div>
              </div>
              <div className="text-white/50 text-sm mt-4 text-center">
                Enter: 제출 | Backspace: 삭제
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 게임 오버 화면 */}
      {isGameOver && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gradient-to-br from-red-900/90 to-purple-900/90 backdrop-blur-md rounded-3xl p-12 max-w-2xl border-2 border-red-500/50 shadow-2xl">
            <h1 className="text-6xl font-bold mb-6 text-center text-red-400">
              게임 종료!
            </h1>
            <div className="text-center mb-8">
              <div className="text-white/90 text-2xl mb-4">최종 점수</div>
              <div className="text-yellow-400 text-6xl font-bold mb-6">
                {score}점
              </div>
              <div className="text-white/70 text-lg">최고 콤보: {combo}</div>
            </div>

            {/* 다시 시작 버튼 */}
            <div className="text-center">
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-xl px-12 py-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                다시 시작
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 게임 설명 (처음 화면) */}
      {!isPlaying && !isGameOver && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-md rounded-3xl p-12 max-w-2xl border-2 border-white/20 shadow-2xl">
            <h1 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              한글 플라이
            </h1>
            <p className="text-white/90 text-xl mb-8 text-center leading-relaxed">
              날아다니는 자음과 모음을 조합해서
              <br />
              숨겨진 단어를 맞춰보세요!
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
              <div className="mt-6 p-4 bg-white/10 rounded-lg space-y-2">
                <p className="text-white/70 text-sm">
                  💡 힌트: 테마와 글자 수가 화면에 표시됩니다!
                </p>
                <p className="text-white/70 text-sm">
                  ⏭️ 어려우면 패스 버튼으로 다음 문제로!
                </p>
                <p className="text-white/70 text-sm">
                  ⏰ 제한 시간 5분 안에 최대한 많이 맞춰보세요!
                </p>
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
