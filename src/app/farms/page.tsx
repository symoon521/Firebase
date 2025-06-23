'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FarmCard from "@/components/farm-card";
import { farms, allCrops } from "@/lib/mock-data";

export default function FarmsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');

  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          farm.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === 'all' || farm.availableCrops.includes(selectedCrop);
    return matchesSearch && matchesCrop;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">나의 농장 찾기</h1>
        <p className="text-lg text-muted-foreground mt-2">재배를 시작할 완벽한 장소를 찾아보세요.</p>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4">
        <Input 
          placeholder="농장 이름 또는 위치로 검색..."
          className="md:flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="작물로 필터링" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 작물</SelectItem>
            {allCrops.map(crop => (
              <SelectItem key={crop} value={crop}>{crop}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredFarms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFarms.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-lg">
          <h2 className="text-2xl font-semibold">농장을 찾을 수 없습니다</h2>
          <p className="text-muted-foreground mt-2">검색 또는 필터 기준을 조정해보세요.</p>
        </div>
      )}
    </div>
  );
}
