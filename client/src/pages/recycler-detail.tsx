import { useRoute } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { MOCK_RECYCLERS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Globe, CheckCircle2, AlertCircle, Share2, Navigation } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function RecyclerDetail() {
  const [match, params] = useRoute("/recyclers/:id");
  const { toast } = useToast();
  const id = params?.id;
  const recycler = MOCK_RECYCLERS.find(r => r.id === id);
  
  // Demo state for capacity toggle
  const [capacity, setCapacity] = useState(recycler?.capacityStatus || 'medium');

  if (!recycler) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold">Recycler not found</h1>
        </div>
      </div>
    );
  }

  const handleCapacityChange = () => {
    toast({
      title: "Authentication Required",
      description: "You must be logged in as the facility owner to change capacity status.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-muted/10">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-background border-b border-border pb-8 pt-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-display font-bold text-foreground">{recycler.name}</h1>
                {recycler.verified && (
                  <CheckCircle2 className="h-6 w-6 text-blue-500 fill-blue-500/10" />
                )}
              </div>
              <div className="flex items-center text-muted-foreground gap-2 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{recycler.address}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recycler.methods.map((method) => (
                  <Badge key={method} variant="secondary" className="px-3 py-1">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <StatusBadge status={capacity} />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({ title: "Link copied to clipboard" });
                }}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Facility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {recycler.description}
              </p>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border flex gap-4 items-start">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Owner Controls (Demo)</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    In production, facility owners can update their real-time capacity status here.
                  </p>
                  <Button variant="outline" size="sm" onClick={handleCapacityChange} className="text-xs h-8">
                    Toggle Capacity Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accepted Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recycler.materials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="font-medium">{material.type}</div>
                    <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      ${material.pricePerKg.toFixed(2)} / kg
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Location Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-muted relative flex items-center justify-center overflow-hidden">
                {/* Mock Map View */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="z-10 flex flex-col items-center">
                   <MapPin className="h-8 w-8 text-primary fill-primary/20 drop-shadow-md" />
                   <div className="bg-white/90 px-2 py-1 text-[10px] rounded shadow-sm mt-1">
                     {recycler.lat.toFixed(3)}, {recycler.lng.toFixed(3)}
                   </div>
                </div>
              </div>
              <div className="p-4 bg-muted/20 text-xs text-center text-muted-foreground border-t">
                Google Maps integration requires API key
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recycler.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{recycler.phone}</span>
                </div>
              )}
              {recycler.email && (
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 flex items-center justify-center font-bold text-xs bg-muted rounded">@</span>
                  <span className="text-sm">{recycler.email}</span>
                </div>
              )}
              {recycler.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-primary hover:underline">Visit Website</a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
