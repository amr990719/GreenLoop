import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Upload, FileText, Loader2, CheckCircle } from "lucide-react";

export default function JoinWastePicker() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        toast({
          title: "Location detected",
          description: "Your current location has been saved.",
        });
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "ID Required",
        description: "Please upload your ID document to verify your account.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Registration Successful",
        description: "Your application has been submitted for verification.",
      });
      // Reset form would go here
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-muted/10 pb-12">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 pt-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold mb-2">Join as a Waste Picker</h1>
          <p className="text-muted-foreground">Get verified access to recyclers and fair pricing.</p>
        </div>

        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle>Registration Details</CardTitle>
            <CardDescription>We need some basic information to verify your identity.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
              </div>

              <div className="space-y-2">
                <Label>Base Location (Optional)</Label>
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    value={location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : ""} 
                    placeholder="No location set" 
                    className="bg-muted"
                  />
                  <Button type="button" variant="outline" onClick={handleLocation}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Use Current
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Helping us know where you operate helps connect you with nearby recyclers.</p>
              </div>

              <div className="space-y-4 border-2 border-dashed border-border rounded-lg p-6 hover:bg-muted/30 transition-colors text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Upload Identification</h3>
                  <p className="text-xs text-muted-foreground">ID Card, Driver's License, or Passport (Max 5MB)</p>
                </div>
                
                <Input 
                  id="id-upload" 
                  type="file" 
                  accept="image/jpeg,image/png,application/pdf"
                  className="hidden" 
                  onChange={handleFileChange}
                />
                
                {!file ? (
                  <Button type="button" variant="secondary" onClick={() => document.getElementById('id-upload')?.click()}>
                    Select File
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-sm bg-primary/5 p-2 rounded text-primary font-medium">
                    <FileText className="h-4 w-4" />
                    {file.name}
                    <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full ml-2" onClick={() => setFile(null)}>X</Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full h-11 text-lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
