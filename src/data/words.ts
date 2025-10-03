// 게임에 사용될 한글 단어 목록

export const WORD_LIST = [
  "한글날",
  "사과",
  "바나나",
  "컴퓨터",
  "키보드",
  "마우스",
  "모니터",
  "노트북",
  "스마트폰",
  "태블릿",
  "카메라",
  "헤드폰",
  "스피커",
  "텔레비전",
  "냉장고",
  "세탁기",
  "에어컨",
  "선풍기",
  "청소기",
  "전자레인지",
  "코끼리",
  "기린",
  "호랑이",
  "사자",
  "토끼",
  "강아지",
  "고양이",
  "햄스터",
  "앵무새",
  "금붕어",
];

/**
 * 랜덤으로 단어 선택
 */
export function getRandomWord(excludeWord?: string): string {
  let availableWords = WORD_LIST;

  // 현재 단어를 제외 (중복 방지)
  if (excludeWord) {
    availableWords = WORD_LIST.filter((word) => word !== excludeWord);
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
}
