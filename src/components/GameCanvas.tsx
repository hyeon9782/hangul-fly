import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { FloatingChar } from "./FloatingChar";
import {
  decomposeHangul,
  isVowel,
  getRandomPosition,
  getRandomSpeed,
} from "../utils/hangul";
import { HangulChar3D } from "./HangulChar3D";

interface GameCanvasProps {
  targetWord?: string;
}

export function GameCanvas({ targetWord = "한글날" }: GameCanvasProps) {
  // 타겟 단어를 자음/모음으로 분해
  const chars = decomposeHangul(targetWord);

  // 추가 랜덤 글자들 (방해 요소)
  const distractorChars = ["ㄱ", "ㄴ", "ㅏ", "ㅓ", "ㅂ", "ㅅ"];
  const allChars = [...chars, ...distractorChars];

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }}
      style={{
        background: "linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)",
      }}
    >
      {/* 조명 설정 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />

      {/* 환경 설정 */}
      <Environment preset="city" />

      {/* 날아다니는 3D 한글 글자들 */}
      {allChars.map((char, index) => {
        const position = getRandomPosition();
        const speed = getRandomSpeed();
        const vowel = isVowel(char);

        return (
          <FloatingChar
            key={`${char}-${index}`}
            char={char}
            isVowel={vowel}
            position={position}
            speed={speed}
          />
          // <HangulChar3D
          //   key={`${char}-${index}`}
          //   char={char}
          //   isConsonant={vowel}
          //   position={position}
          // />
        );
      })}

      {/* 카메라 컨트롤 (개발 중에만 사용) */}
      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
  );
}
