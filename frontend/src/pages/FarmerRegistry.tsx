
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Plus, Edit, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Farmer {
  id: number
  name: string
  village: string
  landholding: string
  primaryCrop: string
  soilTestStatus: string
  contact: string
  lastUpdated: string
}

const FarmerRegistry = () => {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("list")
  const [searchTerm, setSearchTerm] = useState("")
  
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    village: "",
    contact: "",
    aadhar: "",
    landholding: "",
    irrigatedLand: "",
    rainfedLand: "",
    primaryCrop: "",
    secondaryCrop: "",
    livestockCount: "",
    soilTestDate: "",
    soilPH: "",
    soilNitrogen: "",
    soilPhosphorus: "",
    soilPotassium: "",
    organicMatter: "",
    notes: ""
  })

  // Mock farmer data
  const farmers: Farmer[] = [
    { id: 1, name: "Raj Kumar", village: "Krishnapur", landholding: "2.5 acres", primaryCrop: "Rice", soilTestStatus: "Completed", contact: "9876543210", lastUpdated: "2024-06-15" },
    { id: 2, name: "Sita Devi", village: "Ramgarh", landholding: "1.8 acres", primaryCrop: "Wheat", soilTestStatus: "Pending", contact: "9876543211", lastUpdated: "2024-06-14" },
    { id: 3, name: "Mohan Singh", village: "Govindpur", landholding: "3.2 acres", primaryCrop: "Vegetables", soilTestStatus: "Completed", contact: "9876543212", lastUpdated: "2024-06-13" },
    { id: 4, name: "Kamla Devi", village: "Krishnapur", landholding: "1.5 acres", primaryCrop: "Pulses", soilTestStatus: "Overdue", contact: "9876543213", lastUpdated: "2024-06-12" },
  ]

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.primaryCrop.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Farmer data submitted:", formData)
    toast({
      title: "Farmer Registered Successfully",
      description: `${formData.name} has been added to the registry.`,
    })
    setActiveTab("list")
    // Reset form
    setFormData({
      name: "", fatherName: "", village: "", contact: "", aadhar: "",
      landholding: "", irrigatedLand: "", rainfedLand: "", primaryCrop: "",
      secondaryCrop: "", livestockCount: "", soilTestDate: "", soilPH: "",
      soilNitrogen: "", soilPhosphorus: "", soilPotassium: "", organicMatter: "", notes: ""
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-agri-green-500 text-white">Completed</Badge>
      case "Pending":
        return <Badge className="bg-agri-orange-500 text-white">Pending</Badge>
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Farmer Registry</h1>
          <p className="text-muted-foreground">Manage farmer profiles and soil test records</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Farmer List
          </TabsTrigger>
          <TabsTrigger value="register" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Register Farmer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Search Farmers</CardTitle>
              <CardDescription>Find farmers by name, village, or crop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search farmers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Farmer List */}
          <Card>
            <CardHeader>
              <CardTitle>Registered Farmers ({filteredFarmers.length})</CardTitle>
              <CardDescription>All farmer profiles in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFarmers.map((farmer) => (
                  <div key={farmer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{farmer.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {farmer.village} • {farmer.landholding} • {farmer.primaryCrop}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Contact: {farmer.contact} • Updated: {farmer.lastUpdated}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">Soil Test Status</p>
                        {getStatusBadge(farmer.soilTestStatus)}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Activity className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Basic farmer details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Farmer Name *</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter farmer name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input 
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                    placeholder="Enter father's name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="village">Village *</Label>
                  <Select value={formData.village} onValueChange={(value) => handleInputChange("village", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select village" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="krishnapur">Krishnapur</SelectItem>
                      <SelectItem value="ramgarh">Ramgarh</SelectItem>
                      <SelectItem value="govindpur">Govindpur</SelectItem>
                      <SelectItem value="shivnagar">Shivnagar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input 
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => handleInputChange("contact", e.target.value)}
                    placeholder="10-digit mobile number"
                    type="tel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhar">Aadhar Number</Label>
                  <Input 
                    id="aadhar"
                    value={formData.aadhar}
                    onChange={(e) => handleInputChange("aadhar", e.target.value)}
                    placeholder="12-digit Aadhar number"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Land Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-agri-green-700">Land Holding Details</CardTitle>
                <CardDescription>Agricultural land information and crops</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="landholding">Total Land (acres)</Label>
                  <Input 
                    id="landholding"
                    value={formData.landholding}
                    onChange={(e) => handleInputChange("landholding", e.target.value)}
                    placeholder="Total land in acres"
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irrigatedLand">Irrigated Land (acres)</Label>
                  <Input 
                    id="irrigatedLand"
                    value={formData.irrigatedLand}
                    onChange={(e) => handleInputChange("irrigatedLand", e.target.value)}
                    placeholder="Irrigated land"
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rainfedLand">Rainfed Land (acres)</Label>
                  <Input 
                    id="rainfedLand"
                    value={formData.rainfedLand}
                    onChange={(e) => handleInputChange("rainfedLand", e.target.value)}
                    placeholder="Rainfed land"
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="livestockCount">Livestock Count</Label>
                  <Input 
                    id="livestockCount"
                    value={formData.livestockCount}
                    onChange={(e) => handleInputChange("livestockCount", e.target.value)}
                    placeholder="Number of animals"
                    type="number"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="primaryCrop">Primary Crop</Label>
                  <Select value={formData.primaryCrop} onValueChange={(value) => handleInputChange("primaryCrop", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="pulses">Pulses</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="secondaryCrop">Secondary Crop</Label>
                  <Input 
                    id="secondaryCrop"
                    value={formData.secondaryCrop}
                    onChange={(e) => handleInputChange("secondaryCrop", e.target.value)}
                    placeholder="Secondary crop (if any)"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Soil Test History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-agri-brown-700">Soil Test Information</CardTitle>
                <CardDescription>Latest soil test results and parameters</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="soilTestDate">Last Soil Test Date</Label>
                  <Input 
                    id="soilTestDate"
                    value={formData.soilTestDate}
                    onChange={(e) => handleInputChange("soilTestDate", e.target.value)}
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soilPH">Soil pH</Label>
                  <Input 
                    id="soilPH"
                    value={formData.soilPH}
                    onChange={(e) => handleInputChange("soilPH", e.target.value)}
                    placeholder="pH value (0-14)"
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organicMatter">Organic Matter (%)</Label>
                  <Input 
                    id="organicMatter"
                    value={formData.organicMatter}
                    onChange={(e) => handleInputChange("organicMatter", e.target.value)}
                    placeholder="Percentage"
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soilNitrogen">Nitrogen (kg/ha)</Label>
                  <Input 
                    id="soilNitrogen"
                    value={formData.soilNitrogen}
                    onChange={(e) => handleInputChange("soilNitrogen", e.target.value)}
                    placeholder="Nitrogen level"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soilPhosphorus">Phosphorus (kg/ha)</Label>
                  <Input 
                    id="soilPhosphorus"
                    value={formData.soilPhosphorus}
                    onChange={(e) => handleInputChange("soilPhosphorus", e.target.value)}
                    placeholder="Phosphorus level"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soilPotassium">Potassium (kg/ha)</Label>
                  <Input 
                    id="soilPotassium"
                    value={formData.soilPotassium}
                    onChange={(e) => handleInputChange("soilPotassium", e.target.value)}
                    placeholder="Potassium level"
                    type="number"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Any other relevant details about the farmer</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Additional notes, observations, or special requirements..."
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Register Farmer
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FarmerRegistry
