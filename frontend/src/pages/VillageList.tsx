import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, ArrowUpDown, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

// Dummy data for villages
const dummyVillages = [
  {
    id: 1,
    villageName: "Krishnapur",
    district: "Lucknow",
    subDistrict: "Malihabad",
    population: 2450,
    totalFarmers: 156,
    status: "Active"
  },
  {
    id: 2,
    villageName: "Ramgarh",
    district: "Kanpur",
    subDistrict: "Bilhaur",
    population: 1890,
    totalFarmers: 98,
    status: "Active"
  },
  {
    id: 3,
    villageName: "Mahila Mandal",
    district: "Varanasi",
    subDistrict: "Pindra",
    population: 3200,
    totalFarmers: 234,
    status: "Active"
  },
  {
    id: 4,
    villageName: "Green Valley",
    district: "Prayagraj",
    subDistrict: "Karchana",
    population: 1780,
    totalFarmers: 87,
    status: "Active"
  },
  {
    id: 5,
    villageName: "Sundarpur",
    district: "Gorakhpur",
    subDistrict: "Sahjanwa",
    population: 2950,
    totalFarmers: 189,
    status: "Active"
  },
  {
    id: 6,
    villageName: "Devipur",
    district: "Azamgarh",
    subDistrict: "Sagri",
    population: 2100,
    totalFarmers: 134,
    status: "Active"
  },
  {
    id: 7,
    villageName: "Lakshmipur",
    district: "Jaunpur",
    subDistrict: "Shahganj",
    population: 1650,
    totalFarmers: 76,
    status: "Active"
  },
  {
    id: 8,
    villageName: "Gopalpur",
    district: "Sultanpur",
    subDistrict: "Kadipur",
    population: 2800,
    totalFarmers: 167,
    status: "Active"
  }
]

type SortField = 'villageName' | 'district' | 'subDistrict' | 'population' | 'totalFarmers'
type SortDirection = 'asc' | 'desc'

const VillageList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>('villageName')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Filter villages based on search term
  const filteredVillages = dummyVillages.filter(village =>
    village.villageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    village.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    village.subDistrict.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort villages
  const sortedVillages = [...filteredVillages].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />
    }
    return sortDirection === 'asc' ? 
      <ArrowUpDown className="w-4 h-4 text-blue-600" /> : 
      <ArrowUpDown className="w-4 h-4 text-blue-600 rotate-180" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Villages</h1>
          <p className="text-muted-foreground">Manage and view all registered villages</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/village-onboarding">
            <Plus className="w-4 h-4 mr-2" />
            Add New Village
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Villages</p>
                <p className="text-2xl font-bold">{dummyVillages.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Population</p>
                <p className="text-2xl font-bold">{dummyVillages.reduce((sum, village) => sum + village.population, 0).toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Farmers</p>
                <p className="text-2xl font-bold">{dummyVillages.reduce((sum, village) => sum + village.totalFarmers, 0).toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold">🌾</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Districts</p>
                <p className="text-2xl font-bold">{new Set(dummyVillages.map(v => v.district)).size}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">🗺️</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Village Data</CardTitle>
          <CardDescription>Search and sort through all registered villages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search villages, districts, or sub districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('villageName')}
                      className="h-8 flex items-center gap-1 p-0 font-semibold"
                    >
                      Village Name
                      {getSortIcon('villageName')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('district')}
                      className="h-8 flex items-center gap-1 p-0 font-semibold"
                    >
                      District
                      {getSortIcon('district')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('subDistrict')}
                      className="h-8 flex items-center gap-1 p-0 font-semibold"
                    >
                      Sub District
                      {getSortIcon('subDistrict')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('population')}
                      className="h-8 flex items-center gap-1 p-0 font-semibold"
                    >
                      Population
                      {getSortIcon('population')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('totalFarmers')}
                      className="h-8 flex items-center gap-1 p-0 font-semibold"
                    >
                      Farmers
                      {getSortIcon('totalFarmers')}
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedVillages.map((village) => (
                  <TableRow key={village.id}>
                    <TableCell className="font-medium">{village.villageName}</TableCell>
                    <TableCell>{village.district}</TableCell>
                    <TableCell>{village.subDistrict}</TableCell>
                    <TableCell>{village.population.toLocaleString()}</TableCell>
                    <TableCell>{village.totalFarmers.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {village.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {sortedVillages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No villages found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default VillageList 