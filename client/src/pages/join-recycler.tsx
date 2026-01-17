import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import MapPicker from "@/components/MapPicker";
import MaterialListEditor from "@/components/MaterialListEditor";
import { RecyclerMaterial } from "@/lib/mock-data";

export default function JoinRecycler() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [materials, setMaterials] = useState<RecyclerMaterial[]>([]);
  const [acceptingMore, setAcceptingMore] = useState(true);
  const [methods, setMethods] = useState<string[]>([]);
  
  const handleMethodToggle = (method: string) => {
    setMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (materials.length === 0) {
      toast({
        title: "Materials Required",
        description: "Please add at least one material you accept.",
        variant: "destructive"
      });
      return;
    }
    if (methods.length === 0) {
      toast({
        title: "Methods Required",
        description: "Please select at least one collection method.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Mock API
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile Created",
        description: "Your recycler profile is now pending verification.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-muted/10 pb-12">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Register Recycling Facility</h1>
          <p className="text-muted-foreground">List your services and connect with local waste suppliers.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="Green Earth Recycling" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1..." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input id="email" type="email" placeholder="contact@..." />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Where can people find you?</CardDescription>
              </CardHeader>
              <CardContent>
                <MapPicker onLocationSelect={(loc) => console.log(loc)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Collection Methods</Label>
                  <div className="flex gap-6">
                    {["Drop-off", "Pickup", "Buy-back", "Other"].map((m) => (
                      <div key={m} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`method-${m}`} 
                          checked={methods.includes(m)}
                          onCheckedChange={() => handleMethodToggle(m)}
                        />
                        <label
                          htmlFor={`method-${m}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {m}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-muted/50 p-4 rounded-lg">
                  <Switch 
                    id="accepting" 
                    checked={acceptingMore}
                    onCheckedChange={setAcceptingMore}
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="accepting">Currently Accepting Materials</Label>
                    <p className="text-xs text-muted-foreground">Turn this off if your facility is at full capacity.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Materials & Pricing</CardTitle>
                <CardDescription>Add the materials you accept and your current buying price.</CardDescription>
              </CardHeader>
              <CardContent>
                <MaterialListEditor materials={materials} onChange={setMaterials} />
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
              Create Recycler Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
