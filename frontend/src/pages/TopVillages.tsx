import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Users, TrendingUp, Building2, Users2 } from "lucide-react"
import SearchVillages from "@/components/SearchVillage"
import VLEMap from "@/components/VLEMap"

// Mock data for VLEs with Madhya Pradesh districts and coordinates
const vleData = [
  {
    id: "VLE001",
    name: "Rajesh Kumar",
    village: "Krishnapur",
    district: "Bhopal",
    totalIncome: 456000,
    monthlyIncome: 45600,
    machinesOwned: 3,
    customersServed: 42,
    status: "Active",
    coordinates: [23.2599, 77.4126] as [number, number]
  },
  {
    id: "VLE002", 
    name: "Priya Sharma",
    village: "Ramgarh",
    district: "Indore",
    totalIncome: 389000,
    monthlyIncome: 38900,
    machinesOwned: 2,
    customersServed: 35,
    status: "Active",
    coordinates: [22.7196, 75.8577] as [number, number]
  },
  {
    id: "VLE003",
    name: "Suresh Patel",
    village: "Mahila Mandal",
    district: "Jabalpur", 
    totalIncome: 523000,
    monthlyIncome: 52300,
    machinesOwned: 4,
    customersServed: 48,
    status: "Active",
    coordinates: [23.1815, 79.9864] as [number, number]
  },
  {
    id: "VLE004",
    name: "Lakshmi Devi",
    village: "Green Valley",
    district: "Gwalior",
    totalIncome: 312000,
    monthlyIncome: 31200,
    machinesOwned: 2,
    customersServed: 28,
    status: "Active",
    coordinates: [26.2183, 78.1828] as [number, number]
  },
  {
    id: "VLE005",
    name: "Amit Singh",
    village: "Sundarpur",
    district: "Ujjain",
    totalIncome: 445000,
    monthlyIncome: 44500,
    machinesOwned: 3,
    customersServed: 39,
    status: "Active",
    coordinates: [23.1765, 75.7885] as [number, number]
  },
  {
    id: "VLE006",
    name: "Meera Patel",
    village: "Devgarh",
    district: "Sagar",
    totalIncome: 378000,
    monthlyIncome: 37800,
    machinesOwned: 2,
    customersServed: 31,
    status: "Active",
    coordinates: [23.8388, 78.7378] as [number, number]
  },
  {
    id: "VLE007",
    name: "Ramesh Verma",
    village: "Khandwa",
    district: "Khandwa",
    totalIncome: 412000,
    monthlyIncome: 41200,
    machinesOwned: 3,
    customersServed: 36,
    status: "Active",
    coordinates: [21.8247, 76.3529] as [number, number]
  },
  {
    id: "VLE008",
    name: "Sunita Yadav",
    village: "Ratlam",
    district: "Ratlam",
    totalIncome: 356000,
    monthlyIncome: 35600,
    machinesOwned: 2,
    customersServed: 29,
    status: "Active",
    coordinates: [23.3343, 75.0376] as [number, number]
  }
]

// Mock data for potential villages without VLEs
const potentialVillages = [
  {
    name: "Chhindwara",
    district: "Chhindwara",
    population: 125000,
    farmers: 45000,
    coordinates: [22.0574, 78.9382] as [number, number],
    priority: "High"
  },
  {
    name: "Rewa",
    district: "Rewa",
    population: 235000,
    farmers: 85000,
    coordinates: [24.5373, 81.3042] as [number, number],
    priority: "High"
  },
  {
    name: "Satna",
    district: "Satna",
    population: 283000,
    farmers: 92000,
    coordinates: [24.5854, 80.8292] as [number, number],
    priority: "Medium"
  },
  {
    name: "Sidhi",
    district: "Sidhi",
    population: 112000,
    farmers: 38000,
    coordinates: [24.4158, 81.8828] as [number, number],
    priority: "High"
  },
  {
    name: "Shahdol",
    district: "Shahdol",
    population: 106000,
    farmers: 35000,
    coordinates: [23.3000, 81.3500] as [number, number],
    priority: "Medium"
  },
  {
    name: "Mandla",
    district: "Mandla",
    population: 105000,
    farmers: 32000,
    coordinates: [22.6000, 80.3833] as [number, number],
    priority: "High"
  }
]

// Village data provided by user
const villageData = [
  { name: "Balawani", population: 3022, farmers: 749 },
  { name: "Pura", population: 2735, farmers: 674 },
  { name: "Shyampur", population: 4165, farmers: 601 },
  { name: "Ghughas", population: 2091, farmers: 481 },
  { name: "Pancho", population: 3097, farmers: 523 },
  { name: "Birpur", population: 4920, farmers: 384 },
  { name: "Syarda", population: 2100, farmers: 381 },
  { name: "Arrod", population: 3319, farmers: 621 },
  { name: "Garhi", population: 3115, farmers: 606 },
  { name: "Sunwai", population: 2282, farmers: 442 },
  { name: "Dord", population: 2636, farmers: 828 },
  { name: "Gota", population: 3915, farmers: 1020 },
  { name: "Gopalpura", population: 2000, farmers: 830 },
  { name: "Baroda Kalan", population: 2586, farmers: 663 },
  { name: "Gaswani", population: 3410, farmers: 846 },
  { name: "Sahsram", population: 4798, farmers: 920 },
  { name: "Sumrera", population: 3030, farmers: 597 },
  { name: "Raghunathpur", population: 4760, farmers: 723 },
  { name: "Iklaud", population: 6669, farmers: 1402 },
  { name: "Kathon", population: 2537, farmers: 569 },
  { name: "Dhodar", population: 2989, farmers: 435 },
  { name: "Bagdiya", population: 5734, farmers: 1131 },
  { name: "Jaini", population: 3290, farmers: 842 },
  { name: "Mewada", population: 2480, farmers: 773 },
  { name: "Soi Kalan", population: 5707, farmers: 1063 },
  { name: "Gurnawda", population: 3744, farmers: 681 },
  { name: "Jalalpura", population: 2045, farmers: 369 },
  { name: "Premsar", population: 3135, farmers: 528 },
  { name: "Utanbad", population: 2259, farmers: 470 },
  { name: "Kanapur", population: 2578, farmers: 437 },
  { name: "Radep", population: 3276, farmers: 535 },
  { name: "Pandola", population: 5033, farmers: 586 },
  { name: "Karahal", population: 9775, farmers: 704 },
  { name: "Silpuri", population: 2582, farmers: 556 },
  { name: "Moravan", population: 2116, farmers: 383 }
]

const TopVillages = () => {
  const [selectedVillage, setSelectedVillage] = useState<typeof villageData[0] | null>(null)

  const handleVillageClick = (village: typeof villageData[0]) => {
    setSelectedVillage(village)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">🔍 Looking for the Next Village?</h1>
        <p className="text-muted-foreground">Find optimal locations for new VLE expansion by analyzing current coverage and identifying underserved areas</p>
      </div>

      {/* Selected Village Data Display */}
      {selectedVillage && (
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Building2 className="w-5 h-5" />
              Selected Village: {selectedVillage.name}
            </CardTitle>
            <CardDescription>
              Detailed information about the selected village for VLE expansion analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{selectedVillage.population.toLocaleString()}</div>
                <div className="text-sm font-medium text-blue-800">Total Population</div>
                <div className="text-xs text-blue-600">Residents in village</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">{selectedVillage.farmers.toLocaleString()}</div>
                <div className="text-sm font-medium text-green-800">Total Farmers</div>
                <div className="text-xs text-green-600">Potential customers</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">{((selectedVillage.farmers / selectedVillage.population) * 100).toFixed(1)}%</div>
                <div className="text-sm font-medium text-orange-800">Farmer Ratio</div>
                <div className="text-xs text-orange-600">Farmers per population</div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">VLE Expansion Potential Analysis:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Market Size:</strong> {selectedVillage.farmers} potential customers</p>
                  <p><strong>Population Density:</strong> Good for service coverage</p>
                  <p><strong>Economic Activity:</strong> High agricultural focus</p>
                </div>
                <div>
                  <p><strong>Recommended Services:</strong> Agricultural machinery, seeds, fertilizers</p>
                  <p><strong>Expected Monthly Revenue:</strong> ₹{Math.round(selectedVillage.farmers * 1500)}</p>
                  <p><strong>Priority Level:</strong> {selectedVillage.farmers > 800 ? 'High' : selectedVillage.farmers > 500 ? 'Medium' : 'Low'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* VLE Coverage Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            VLE Coverage Analysis Map
          </CardTitle>
          <CardDescription>
            Interactive map showing current VLE locations and potential expansion areas in Madhya Pradesh
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VLEMap vles={vleData} potentialVillages={potentialVillages} height="500px" />
        </CardContent>
      </Card>

      {/* Village Selection Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users2 className="w-5 h-5 text-primary" />
            Available Villages for VLE Expansion
          </CardTitle>
          <CardDescription>
            Click on any village to view detailed information and expansion potential
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {villageData.map((village) => (
              <div
                key={village.name}
                onClick={() => handleVillageClick(village)}
                className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedVillage?.name === village.name 
                    ? 'border-primary bg-primary/10 shadow-md' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-medium mb-1">{village.name}</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Population: {village.population.toLocaleString()}</div>
                  <div>Farmers: {village.farmers.toLocaleString()}</div>
                  <div className={`text-xs font-medium ${
                    village.farmers > 800 ? 'text-red-600' : 
                    village.farmers > 500 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {village.farmers > 800 ? 'High Priority' : 
                     village.farmers > 500 ? 'Medium Priority' : 'Low Priority'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Coverage Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Coverage Analysis & Recommendations
          </CardTitle>
          <CardDescription>
            Analysis of current VLE coverage and recommendations for expansion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{vleData.length}</div>
              <div className="text-sm font-medium text-blue-800">Current VLEs</div>
              <div className="text-xs text-blue-600">Active entrepreneurs</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">{villageData.length}</div>
              <div className="text-sm font-medium text-orange-800">Available Villages</div>
              <div className="text-xs text-orange-600">For expansion</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{villageData.filter(v => v.farmers > 800).length}</div>
              <div className="text-sm font-medium text-green-800">High Priority</div>
              <div className="text-xs text-green-600">Villages with 800+ farmers</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-lg">High Priority Expansion Areas:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {potentialVillages.map((village) => (
                <div key={village.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{village.name}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      village.priority === 'High' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {village.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{village.district} District</p>
                  <div className="flex justify-between text-sm">
                    <span>Population: {village.population.toLocaleString()}</span>
                    <span>Farmers: {village.farmers.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Village Search
          </CardTitle>
          <CardDescription>
            Enter a district name to find top villages with their population and farmer data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/20 rounded-lg p-6">
            <SearchVillages />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TopVillages 