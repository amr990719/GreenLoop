import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import { MOCK_RECYCLERS, calculateDistance, MATERIALS } from "@/lib/mock-data";
import RecyclerCard from "@/components/RecyclerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Filter } from "lucide-react";

export default function RecyclersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [materialFilter, setMaterialFilter] = useState<string>("all");
  const [acceptingOnly, setAcceptingOnly] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocateMe = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
      }, (error) => {
        console.error("Error getting location", error);
        // Fallback to a default location (e.g. NYC center) for demo if permission denied
        setUserLocation({ lat: 40.7128, lng: -74.0060 });
        setIsLocating(false);
      });
    } else {
      setIsLocating(false);
    }
  };

  const filteredRecyclers = useMemo(() => {
    let result = MOCK_RECYCLERS.map(r => ({
      ...r,
      distance: userLocation ? calculateDistance(userLocation.lat, userLocation.lng, r.lat, r.lng) : undefined
    }));

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.address.toLowerCase().includes(q) ||
        r.materials.some(m => m.type.toLowerCase().includes(q))
      );
    }

    if (methodFilter !== "all") {
      result = result.filter(r => r.methods.includes(methodFilter));
    }

    if (materialFilter !== "all") {
      result = result.filter(r => r.materials.some(m => m.type === materialFilter));
    }

    if (acceptingOnly) {
      result = result.filter(r => r.acceptingMore);
    }

    // Sort by distance if location available
    if (userLocation) {
      result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return result;
  }, [searchQuery, methodFilter, materialFilter, acceptingOnly, userLocation]);

  return (
    <div className="min-h-screen bg-muted/10">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Find Recyclers</h1>
            <p className="text-muted-foreground mt-1">Locate verified centers for your materials.</p>
          </div>
          <Button 
            variant={userLocation ? "default" : "outline"} 
            onClick={handleLocateMe}
            className="gap-2"
          >
            <MapPin className="h-4 w-4" />
            {isLocating ? "Locating..." : userLocation ? "Update My Location" : "Use My Location"}
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, address, or material..." 
                className="pl-9 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="Drop-off">Drop-off</SelectItem>
                  <SelectItem value="Pickup">Pickup</SelectItem>
                  <SelectItem value="Buy-back">Buy-back</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={materialFilter} onValueChange={setMaterialFilter}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="Material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Materials</SelectItem>
                  {MATERIALS.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium mr-2">Filters:</span>
            <div className="flex items-center gap-2">
              <Switch id="accepting-mode" checked={acceptingOnly} onCheckedChange={setAcceptingOnly} />
              <Label htmlFor="accepting-mode" className="cursor-pointer">Accepting Only</Label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecyclers.length > 0 ? (
            filteredRecyclers.map((recycler) => (
              <RecyclerCard key={recycler.id} recycler={recycler} distance={recycler.distance} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 opacity-20" />
              </div>
              <h3 className="text-lg font-medium text-foreground">No recyclers found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
