import { Recycler } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface RecyclerCardProps {
  recycler: Recycler;
  distance?: number;
}

export default function RecyclerCard({ recycler, distance }: RecyclerCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <CardHeader className="p-0">
        <div className="h-2 bg-gradient-to-r from-primary to-accent" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors">
                {recycler.name}
              </h3>
              {recycler.verified && (
                <CheckCircle2 className="h-4 w-4 text-blue-500 fill-blue-500/10" />
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate max-w-[200px]">{recycler.address}</span>
              {distance !== undefined && (
                <span className="text-primary font-medium ml-1">• {distance} km</span>
              )}
            </div>
          </div>
          <Badge 
            variant={recycler.acceptingMore ? "default" : "secondary"}
            className={recycler.acceptingMore ? "bg-green-100 text-green-800 hover:bg-green-200 shadow-none" : "bg-gray-100 text-gray-500 hover:bg-gray-200 shadow-none"}
          >
            {recycler.acceptingMore ? "Accepting" : "Full"}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {recycler.methods.map((method) => (
              <Badge key={method} variant="outline" className="text-xs font-normal border-primary/20 text-primary bg-primary/5">
                {method}
              </Badge>
            ))}
          </div>
          
          <div className="border-t border-border/50 pt-3">
            <p className="text-xs text-muted-foreground uppercase font-semibold mb-2 tracking-wider">Top Materials</p>
            <div className="grid grid-cols-2 gap-2">
              {recycler.materials.slice(0, 3).map((material) => (
                <div key={material.id} className="text-sm flex justify-between items-center bg-muted/30 p-1.5 rounded-md">
                  <span className="truncate mr-2">{material.type}</span>
                  <span className="font-mono text-xs font-medium bg-background px-1.5 py-0.5 rounded border">
                    ${material.pricePerKg}/kg
                  </span>
                </div>
              ))}
              {recycler.materials.length > 3 && (
                <div className="text-xs text-muted-foreground flex items-center justify-center bg-muted/30 rounded-md">
                  +{recycler.materials.length - 3} more
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/10 flex justify-between items-center border-t border-border/50">
        {recycler.phone && (
          <Button variant="ghost" size="sm" className="text-muted-foreground h-8">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
        )}
        <Link href={`/recyclers/${recycler.id}`}>
          <Button size="sm" className="bg-white text-foreground border border-input shadow-sm hover:bg-accent hover:text-accent-foreground ml-auto group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
            View Details
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
