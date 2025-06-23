export interface Farm {
  id: string;
  ownerId: string;
  farmName: string;
  location: string;
  address: string;
  isSmartFarm: boolean;
  description: string;
  availableArea: number;
  farmImages: string[];
  availableCrops: string[];
  liveStreamUrl?: string;
}

export interface UserCrop {
  id: string;
  userId: string;
  farmId: string;
  farmName: string;
  cropName: string;
  startDate: Date;
  estimatedHarvestDate: Date;
  status: 'planting' | 'growing' | 'ready_for_harvest' | 'harvested';
  growthLog: { timestamp: Date; event: string }[];
  tagId: string;
}

export const farms: Farm[] = [
  {
    id: "farm-1",
    ownerId: "user-1",
    farmName: "Green Valley Organics",
    location: "California, USA",
    address: "123 Green Valley Rd, Napa, CA 94558",
    isSmartFarm: true,
    description: "유기농 채소 생산에 전념하는 최첨단 스마트 팜입니다. 자동 급수 및 센서 기술을 사용하여 가장 건강한 작물을 보장합니다.",
    availableArea: 50,
    farmImages: ["https://placehold.co/600x400.png"],
    availableCrops: ["Tomato", "Lettuce", "Cucumber", "Carrot"],
    liveStreamUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&loop=1&playlist=jfKfPfyJRdk" // A generic public livestream
  },
  {
    id: "farm-2",
    ownerId: "user-2",
    farmName: "Sunrise Acres",
    location: "Florida, USA",
    address: "456 Sunrise Ave, Orlando, FL 32801",
    isSmartFarm: false,
    description: "햇볕에 잘 익은 과일과 채소를 전문으로 하는 가족 소유 농장입니다. 여러 세대에 걸쳐 전해 내려오는 전통적인 농법을 따릅니다.",
    availableArea: 120,
    farmImages: ["https://placehold.co/600x400.png"],
    availableCrops: ["Strawberry", "Orange", "Bell Pepper", "Tomato"],
  },
  {
    id: "farm-3",
    ownerId: "user-3",
    farmName: "Harvest Moon Fields",
    location: "Texas, USA",
    address: "789 Harvest Moon Ln, Austin, TX 78701",
    isSmartFarm: false,
    description: "다양한 곡물과 뿌리 채소를 재배하기에 완벽한 광활한 들판입니다. 우리는 지속 가능하고 책임감 있는 농업에 자부심을 느낍니다.",
    availableArea: 300,
    farmImages: ["https://placehold.co/600x400.png"],
    availableCrops: ["Corn", "Potato", "Wheat", "Carrot"],
  },
  {
    id: "farm-4",
    ownerId: "user-4",
    farmName: "CyberCrops Initiative",
    location: "Washington, USA",
    address: "101 Digital Way, Seattle, WA 98101",
    isSmartFarm: true,
    description: "도시 중심부에 있는 실험적인 수직 스마트 팜입니다. 우리는 수경 재배와 AI로 도시 농업의 경계를 넓히고 있습니다.",
    availableArea: 20,
    farmImages: ["https://placehold.co/600x400.png"],
    availableCrops: ["Lettuce", "Herbs", "Kale", "Strawberry"],
    liveStreamUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&loop=1&playlist=jfKfPfyJRdk"
  }
];

export const userCrops: UserCrop[] = [
  {
    id: "usercrop-1",
    userId: "auth-user-1",
    farmId: "farm-1",
    farmName: "Green Valley Organics",
    cropName: "Tomato",
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    estimatedHarvestDate: new Date(new Date().setDate(new Date().getDate() + 45)),
    status: "growing",
    growthLog: [
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 30)), event: "영양이 풍부한 토양에 씨앗을 심었습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 15)), event: "물 2L를 주었습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 1)), event: "유기농 해충 방제를 적용했습니다." },
    ],
    tagId: "A-1-Tomato"
  },
  {
    id: "usercrop-2",
    userId: "auth-user-1",
    farmId: "farm-4",
    farmName: "CyberCrops Initiative",
    cropName: "Lettuce",
    startDate: new Date(new Date().setDate(new Date().getDate() - 40)),
    estimatedHarvestDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    status: "ready_for_harvest",
    growthLog: [
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 40)), event: "수경 재배 시스템이 활성화되었습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 20)), event: "영양 수준을 확인하고 조정했습니다." },
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 5)), event: "성장을 위해 LED 조명 주기를 최적화했습니다." },
    ],
    tagId: "V-5-Lettuce"
  },
  {
    id: "usercrop-3",
    userId: "auth-user-1",
    farmId: "farm-2",
    farmName: "Sunrise Acres",
    cropName: "Strawberry",
    startDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    estimatedHarvestDate: new Date(new Date().setDate(new Date().getDate() + 68)),
    status: "planting",
    growthLog: [
      { timestamp: new Date(new Date().setDate(new Date().getDate() - 2)), event: "씨앗을 심었습니다." },
    ],
    tagId: "B-3-Strawberry"
  }
];

export const allCrops = [...new Set(farms.flatMap(f => f.availableCrops))];
