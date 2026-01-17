import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

interface MapPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  defaultLocation?: { lat: number; lng: number; address: string };
  label?: string;
}

export default function MapPicker({ onLocationSelect, defaultLocation, label = "Select Location" }: MapPickerProps) {
  // Since we are mocking without a real API key for now, we'll simulate the behavior.
  // In a real app with key, we would use the Google Maps JS API.
  
  const [searchQuery, setSearchQuery] = useState(defaultLocation?.address || "");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(
    defaultLocation ? { lat: defaultLocation.lat, lng: defaultLocation.lng } : null
  );

  const mockSearch = () => {
    if (!searchQuery) return;
    setIsSearching(true);
    // Mock async search
    setTimeout(() => {
      // Simulate finding a location near New York for demo purposes
      const mockLat = 40.7128 + (Math.random() - 0.5) * 0.1;
      const mockLng = -74.0060 + (Math.random() - 0.5) * 0.1;
      
      const newLocation = {
        lat: mockLat,
        lng: mockLng,
        address: searchQuery // Echo back what they typed for demo
      };
      
      setSelectedCoords({ lat: mockLat, lng: mockLng });
      onLocationSelect(newLocation);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for an address or place..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && mockSearch()}
          />
        </div>
        <Button 
          type="button" 
          onClick={mockSearch} 
          disabled={!searchQuery || isSearching}
          className="bg-primary hover:bg-primary/90"
        >
          {isSearching ? "Searching..." : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {/* Map Preview Placeholder */}
      <div className="relative w-full h-[200px] bg-muted/50 rounded-lg border border-border overflow-hidden flex items-center justify-center group cursor-crosshair">
        {selectedCoords ? (
          <div className="relative w-full h-full bg-[#e5e7eb] flex items-center justify-center overflow-hidden">
             {/* Abstract map pattern for background */}
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px]"></div>
             
             {/* Pin */}
             <div className="z-10 flex flex-col items-center animate-bounce-short">
               <MapPin className="h-8 w-8 text-red-500 fill-red-500/20 drop-shadow-md" />
               <div className="w-3 h-1.5 bg-black/20 rounded-full blur-[1px] mt-1"></div>
             </div>
             
             <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 text-[10px] rounded text-muted-foreground shadow-sm">
               Map Preview (Mock)
             </div>
          </div>
        ) : (
          <div className="text-center p-4 text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-20" />
            <p className="text-sm">Enter a location to see map preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
