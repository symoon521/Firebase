export const farms = [
  {
    id: "farm-1",
    ownerId: "user-1",
    farmName: "늘푸른 유기농 농장",
    location: "경기도 양평",
    address: "경기도 양평군 용문면",
    isSmartFarm: true,
    description: "수도권에서 가장 신선한 유기농 채소를 만나보세요. 저희 스마트팜은 최첨단 자동 급수 및 센서 기술을 사용하여 작물의 건강을 최상으로 유지합니다.",
    availableArea: 50,
    farmImages: ["https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    availableCrops: ["상추", "토마토", "오이", "당근"],
    liveStreamUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&loop=1&playlist=jfKfPfyJRdk"
  },
  {
    id: "farm-2",
    ownerId: "user-2",
    farmName: "제주 스마트팜",
    location: "제주특별자치도 서귀포",
    address: "제주특별자치도 서귀포시 안덕면",
    isSmartFarm: true,
    description: "화산토의 미네랄과 첨단 기술이 만난 제주 스마트팜입니다. 감귤, 한라봉 등 제주 특산물을 재배합니다.",
    availableArea: 120,
    farmImages: ["https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    availableCrops: ["감귤", "한라봉", "브로콜리", "콜라비"],
    liveStreamUrl: "https://www.youtube.com/embed/3-3n7k_Yh1c?autoplay=1&mute=1&loop=1&playlist=3-3n7k_Yh1c"
  },
  {
    id: "farm-3",
    ownerId: "user-3",
    farmName: "강원 청정 고원 농장",
    location: "강원도 평창",
    address: "강원도 평창군 대관령면",
    isSmartFarm: false,
    description: "해발 700m 고원에서 자란 신선한 채소를 제공합니다. 전통 농법으로 자연의 맛을 그대로 전해드립니다.",
    availableArea: 300,
    farmImages: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    availableCrops: ["감자", "배추", "무", "옥수수"],
  },
  {
    id: "farm-4",
    ownerId: "user-4",
    farmName: "경남 스마트 딸기농장",
    location: "경상남도 진주",
    address: "경상남도 진주시 금곡면",
    isSmartFarm: true,
    description: "AI 기반 환경 제어 시스템으로 365일 달콤한 딸기를 재배합니다. 수경재배와 LED 조명으로 최적의 성장 환경을 제공합니다.",
    availableArea: 80,
    farmImages: ["https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    availableCrops: ["딸기", "방울토마토", "상추", "시금치"],
    liveStreamUrl: "https://www.youtube.com/embed/m_p2_2J6ieY?autoplay=1&mute=1&loop=1&playlist=m_p2_2J6ieY"
  },
  {
    id: "farm-5",
    ownerId: "user-5",
    farmName: "충북 전통 농가",
    location: "충청북도 괴산",
    address: "충청북도 괴산군 청천면",
    isSmartFarm: false,
    description: "3대째 이어온 전통 농법으로 건강한 농산물을 키웁니다. 화학비료 없이 자연 그대로의 맛을 선사합니다.",
    availableArea: 200,
    farmImages: ["https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    availableCrops: ["고추", "토마토", "가지", "호박"],
  },
  {
    id: "farm-6",
    ownerId: "user-6",
    farmName: "전남 광활한 들녘농장",
    location: "전라남도 해남",
    address: "전라남도 해남군 삼산면",
    isSmartFarm: false,
    description: "광활한 평야에서 재배하는 곡물과 근채류 전문 농장입니다. 친환경 농법으로 건강하고 맛있는 농산물을 생산합니다.",
    availableArea: 500,
    farmImages: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    availableCrops: ["쌀", "옥수수", "고구마", "양파"],
  }
];

export const userCrops = [
  {
    id: "usercrop-1",
    userId: "auth-user-1",
    farmId: "farm-1",
    farmName: "늘푸른 유기농 농장",
    cropName: "토마토",
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    estimatedHarvestDate: new Date(new Date().setDate(new Date().getDate() + 45)),
    status: "growing",
    growthLog: [
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 30)), event: "영양이 풍부한 토양에 씨앗을 심었습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 15)), event: "자동 급수 시스템이 물 2L를 공급했습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 1)), event: "AI 병충해 감지 시스템이 유기농 방제를 적용했습니다." },
    ],
    tagId: "A-1-Tomato"
  },
  {
    id: "usercrop-2",
    userId: "auth-user-1",
    farmId: "farm-4",
    farmName: "경남 스마트 딸기농장",
    cropName: "딸기",
    startDate: new Date(new Date().setDate(new Date().getDate() - 40)),
    estimatedHarvestDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    status: "ready_for_harvest",
    growthLog: [
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 40)), event: "수경 재배 시스템이 활성화되었습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 20)), event: "영양 수준을 확인하고 조정했습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 5)), event: "성장을 위해 LED 조명 주기를 최적화했습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 1)), event: "수확 준비 완료. 달콤한 딸기를 수확해주세요." },
    ],
    tagId: "S-4-Strawberry"
  },
  {
    id: "usercrop-3",
    userId: "auth-user-1",
    farmId: "farm-2",
    farmName: "제주 스마트팜",
    cropName: "감귤",
    startDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    estimatedHarvestDate: new Date(new Date().setDate(new Date().getDate() + 150)),
    status: "planting",
    growthLog: [
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 2)), event: "묘목을 심었습니다." },
    ],
    tagId: "B-3-Tangerine"
  },
  {
    id: "usercrop-4",
    userId: "auth-user-2",
    farmId: "farm-3",
    farmName: "강원 청정 고원 농장",
    cropName: "감자",
    startDate: new Date(new Date().setDate(new Date().getDate() - 90)),
    estimatedHarvestDate: new Date(new Date().setDate(new Date().getDate() - 5)),
    status: "harvested",
    growthLog: [
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 90)), event: "씨감자를 심었습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 30)), event: "북주기를 완료했습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 5)), event: "수확이 완료되었습니다. 배송을 기다려주세요." },
    ],
    tagId: "C-12-Potato"
  },
  {
    id: "usercrop-5",
    userId: "auth-user-2",
    farmId: "farm-1",
    farmName: "늘푸른 유기농 농장",
    cropName: "오이",
    startDate: new Date(new Date().setDate(new Date().getDate() - 25)),
    estimatedHarvestDate: new Date(new Date().setDate(new Date().getDate() + 35)),
    status: "growing",
    growthLog: [
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 25)), event: "씨앗을 심었습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 10)), event: "덩굴손이 자라기 시작했습니다." },
    ],
    tagId: "A-2-Cucumber"
  }
];

export const allCrops = [...new Set(farms.flatMap(f => f.availableCrops))];