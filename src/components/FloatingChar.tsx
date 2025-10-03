import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei"; // Text3D를 import 합니다.
import type { Group } from "three";

interface FloatingCharProps {
  char: string;
  isVowel: boolean;
  position: [number, number, number];
  speed: number;
}

export function FloatingChar({
  char,
  isVowel,
  position,
  speed,
}: FloatingCharProps) {
  const groupRef = useRef<Group>(null);
  const timeRef = useRef(0);

  // 초기 위치와 움직임 방향을 저장
  const initialPos = useRef(position);
  const direction = useRef({
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
    z: (Math.random() - 0.5) * 2,
  });

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta * speed;

    // 부드러운 회전 애니메이션
    groupRef.current.rotation.x += delta * 0.5;
    groupRef.current.rotation.y += delta * 0.3;

    // 사인파를 이용한 부드러운 움직임 (기존 로직 유지)
    const time = timeRef.current;
    groupRef.current.position.x =
      initialPos.current[0] + Math.sin(time + direction.current.x) * 3;
    groupRef.current.position.y =
      initialPos.current[1] + Math.cos(time + direction.current.y) * 2;
    groupRef.current.position.z =
      initialPos.current[2] + Math.sin(time * 0.5 + direction.current.z) * 2;
  });

  // 자음: 파란색 계열, 모음: 빨간색 계열
  const color = isVowel ? "#ff6b6b" : "#4dabf7";

  return (
    <group ref={groupRef} position={position}>
      {/* Text3D는 <Center>로 감싸서 TextGeometry의 Anchor 문제를 쉽게 해결할 수 있지만, 
        애니메이션 그룹에 바로 적용하기 위해 Text3D 자체에 필요한 속성을 추가했습니다.
        Text3D는 기본적으로 Mesh이므로, groupRef를 Text3D에 직접 적용해도 무방합니다.
      */}
      <Center>
        <Text3D
          // !!! 폰트 경로는 반드시 JSON 파일이어야 합니다. !!!
          font="/fonts/NanumGothic_Bold.json"
          // 3D 텍스트 속성
          size={1.5} // 폰트 크기 (Text 컴포넌트보다 작은 값으로 조정해야 자연스러울 수 있음)
          height={0.5} // 텍스트의 입체적인 깊이 (돌출되는 정도)
          curveSegments={12} // 곡선 부분의 해상도
          // 베벨(Bevel, 경사) 속성으로 모서리를 부드럽게
          bevelEnabled={true}
          bevelThickness={0.1}
          bevelSize={0.05}
          bevelOffset={0}
          bevelSegments={4}
        >
          {char}

          {/* Text3D의 재질 설정 */}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.3}
            toneMapped={false} // 밝은 색상을 유지하기 위해
          />
        </Text3D>
      </Center>
    </group>
  );
}
