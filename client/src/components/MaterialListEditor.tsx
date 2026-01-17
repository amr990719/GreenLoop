import { useState } from "react";
import { MATERIALS, MaterialType, RecyclerMaterial } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface MaterialListEditorProps {
  materials: RecyclerMaterial[];
  onChange: (materials: RecyclerMaterial[]) => void;
}

export default function MaterialListEditor({ materials, onChange }: MaterialListEditorProps) {
  const [selectedType, setSelectedType] = useState<MaterialType | "">("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (!selectedType || !price) return;
    
    const newMaterial: RecyclerMaterial = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType as MaterialType,
      pricePerKg: parseFloat(price)
    };

    onChange([...materials, newMaterial]);
    setSelectedType("");
    setPrice("");
  };

  const handleRemove = (id: string) => {
    onChange(materials.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">Material Type</label>
          <Select value={selectedType} onValueChange={(v) => setSelectedType(v as MaterialType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select material" />
            </SelectTrigger>
            <SelectContent>
              {MATERIALS.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-32 space-y-2">
          <label className="text-sm font-medium">Price/kg ($)</label>
          <Input 
            type="number" 
            step="0.01" 
            min="0"
            placeholder="0.00" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Button type="button" onClick={handleAdd} disabled={!selectedType || !price}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {materials.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-3 bg-muted rounded-md border border-border">
            <span className="font-medium">{m.type}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono bg-background px-2 py-1 rounded">
                ${m.pricePerKg.toFixed(2)} / kg
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleRemove(m.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {materials.length === 0 && (
          <div className="text-center p-6 border border-dashed rounded-md text-muted-foreground text-sm">
            No materials added yet. Add materials you accept above.
          </div>
        )}
      </div>
    </div>
  );
}
