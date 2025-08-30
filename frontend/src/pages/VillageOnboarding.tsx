import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Save } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

const VillageOnboarding = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    villageName: "",
    district: "",
    subDistrict: "",
    population: "",
    totalFarmers: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Village data submitted:", formData)
    toast({
      title: "Village Registered Successfully",
      description: `${formData.villageName} has been added to the system.`,
    })
    // Reset form
    setFormData({
      villageName: "", district: "", subDistrict: "",
      population: "", totalFarmers: ""
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Village Onboarding</h1>
          <p className="text-muted-foreground">Register and collect comprehensive village data</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/village-list">
            <MapPin className="w-4 h-4 mr-2" />
            View All Villages
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Basic Village Information
            </CardTitle>
            <CardDescription>Enter the fundamental details about the village</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="villageName">Village Name *</Label>
              <Input 
                id="villageName"
                value={formData.villageName}
                onChange={(e) => handleInputChange("villageName", e.target.value)}
                placeholder="Enter village name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District *</Label>
              <Input 
                id="district"
                value={formData.district}
                onChange={(e) => handleInputChange("district", e.target.value)}
                placeholder="Enter district name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subDistrict">Sub District *</Label>
              <Input 
                id="subDistrict"
                value={formData.subDistrict}
                onChange={(e) => handleInputChange("subDistrict", e.target.value)}
                placeholder="Enter sub district name"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-agri-orange-700">Demographics</CardTitle>
            <CardDescription>Population and farmer statistics</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="population">Total Population *</Label>
              <Input 
                id="population"
                value={formData.population}
                onChange={(e) => handleInputChange("population", e.target.value)}
                placeholder="Total population"
                type="number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalFarmers">Total Farmers *</Label>
              <Input 
                id="totalFarmers"
                value={formData.totalFarmers}
                onChange={(e) => handleInputChange("totalFarmers", e.target.value)}
                placeholder="Number of farmers"
                type="number"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Register Village
          </Button>
        </div>
      </form>
    </div>
  )
}

export default VillageOnboarding
