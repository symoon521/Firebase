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
    description: "A state-of-the-art smart farm dedicated to organic vegetable production. We use automated watering and sensor technology to ensure the healthiest crops.",
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
    description: "Family-owned farm specializing in sun-ripened fruits and vegetables. We follow traditional farming methods passed down through generations.",
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
    description: "Vast open fields perfect for growing a variety of grains and root vegetables. We pride ourselves on sustainable and responsible farming.",
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
    description: "An experimental vertical smart farm in the heart of the city. We are pushing the boundaries of urban agriculture with hydroponics and AI.",
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
    startDate: new Date("2024-05-01"),
    estimatedHarvestDate: new Date("2024-08-15"),
    status: "growing",
    growthLog: [
      { timestamp: new Date("2024-05-01T10:00:00Z"), event: "Seeds planted in nutrient-rich soil." },
      { timestamp: new Date("2024-05-15T09:00:00Z"), event: "Watered with 2L of water." },
      { timestamp: new Date("2024-06-01T11:30:00Z"), event: "Organic pest control applied." },
    ],
    tagId: "A-1-Tomato"
  },
  {
    id: "usercrop-2",
    userId: "auth-user-1",
    farmId: "farm-4",
    farmName: "CyberCrops Initiative",
    cropName: "Lettuce",
    startDate: new Date("2024-06-10"),
    estimatedHarvestDate: new Date("2024-07-25"),
    status: "ready_for_harvest",
    growthLog: [
      { timestamp: new Date("2024-06-10T14:00:00Z"), event: "Hydroponic system activated." },
      { timestamp: new Date("2024-06-20T14:00:00Z"), event: "Nutrient levels checked and adjusted." },
      { timestamp: new Date("2024-07-05T14:00:00Z"), event: "LED light cycle optimized for growth." },
    ],
    tagId: "V-5-Lettuce"
  }
];

export const allCrops = [...new Set(farms.flatMap(f => f.availableCrops))];
