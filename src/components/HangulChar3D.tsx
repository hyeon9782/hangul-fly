import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface HangulChar3DProps {
  char: string;
  position: [number, number, number];
  isConsonant: boolean;
}

// 개별 한글 문자 컴포넌트
export function HangulChar3D({
  char,
  position,
  isConsonant,
}: HangulChar3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // 애니메이션: 회전하면서 떠다니기
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y =
        position[1] +
        Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });

  return (
    <Center position={position}>
      <Text3D
        ref={meshRef}
        font="/fonts/NanumGothic_Bold.json" // 폰트 파일 필요
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {char}
        <meshStandardMaterial
          color={isConsonant ? "#3b82f6" : "#ef4444"} // 자음: 파랑, 모음: 빨강
          metalness={0.3}
          roughness={0.4}
        />
      </Text3D>
    </Center>
  );
}

// // 여러 한글 문자를 화면에 배치
// function HangulScene({
//   chars,
// }: {
//   chars: Array<{ char: string; isConsonant: boolean }>;
// }) {
//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[10, 10, 5]} intensity={1} />
//       <pointLight position={[-10, -10, -5]} intensity={0.5} />

//       {chars.map((item, index) => {
//         // 랜덤한 위치에 배치
//         const x = (Math.random() - 0.5) * 10;
//         const y = (Math.random() - 0.5) * 5;
//         const z = (Math.random() - 0.5) * 5;

//         return (
//           <HangulChar3D
//             key={index}
//             char={item.char}
//             position={[x, y, z]}
//             isConsonant={item.isConsonant}
//           />
//         );
//       })}

//       <OrbitControls />
//     </>
//   );
// }

// // 메인 컴포넌트
// export default function HangulGame() {
//   // 예시: '사과' 분해 → ㅅ, ㅏ, ㄱ, ㅘ
//   const testChars = [
//     { char: "ㅅ", isConsonant: true },
//     { char: "ㅏ", isConsonant: false },
//     { char: "ㄱ", isConsonant: true },
//     { char: "ㅘ", isConsonant: false },
//   ];

//   return (
//     <div className="w-screen h-screen">
//       <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
//         <color attach="background" args={["#0f172a"]} />
//         <HangulScene chars={testChars} />
//       </Canvas>
//     </div>
//   );
// }
