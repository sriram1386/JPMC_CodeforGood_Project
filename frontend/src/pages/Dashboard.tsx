import { useState } from "react"
import { StatsCard } from "@/components/StatsCard"
import { DashboardChart } from "@/components/DashboardChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VLEMap from "@/components/VLEMap"
import { 
  MapPin, 
  Users, 
  Truck, 
  Cog, 
  UserCheck, 
  Plus,
  DollarSign,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  Eye,
  Calendar,
  Settings,
  Building2
} from "lucide-react"
import { Link } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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

// Chart data
const monthlyEarningsData = [
  { month: "Jan", earnings: 42000 },
  { month: "Feb", earnings: 45000 },
  { month: "Mar", earnings: 48000 },
  { month: "Apr", earnings: 52000 },
  { month: "May", earnings: 49000 },
  { month: "Jun", earnings: 45600 }
]

const machineTypeData = [
  { type: "Tractors", count: 12, percentage: 40 },
  { type: "Harvesters", count: 8, percentage: 27 },
  { type: "Seeders", count: 6, percentage: 20 },
  { type: "Threshers", count: 4, percentage: 13 }
]

// Updated district distribution data for Madhya Pradesh
const districtDistributionData = [
  { district: "Bhopal", vles: 1, percentage: 12.5 },
  { district: "Indore", vles: 1, percentage: 12.5 },
  { district: "Jabalpur", vles: 1, percentage: 12.5 },
  { district: "Gwalior", vles: 1, percentage: 12.5 },
  { district: "Ujjain", vles: 1, percentage: 12.5 },
  { district: "Sagar", vles: 1, percentage: 12.5 },
  { district: "Khandwa", vles: 1, percentage: 12.5 },
  { district: "Ratlam", vles: 1, percentage: 12.5 }
]

const Dashboard = () => {
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [isVLEDashboard, setIsVLEDashboard] = useState(false)

  const totalVLEs = vleData.length
  const totalIncome = vleData.reduce((sum, vle) => sum + vle.totalIncome, 0)
  const avgMonthlyIncome = vleData.reduce((sum, vle) => sum + vle.monthlyIncome, 0) / totalVLEs
  const totalCustomers = vleData.reduce((sum, vle) => sum + vle.customersServed, 0)

  // Regular Dashboard Content
  const RegularDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Villages"
          value="32"
          icon={MapPin}
          description="Registered villages"
          trend="+5 this month"
          className="border-l-4 border-l-blue-500"
        />
        <StatsCard
          title="Total Farmers"
          value="1,240"
          icon={Users}
          description="Registered farmers"
          trend="+45 this month"
          className="border-l-4 border-l-green-500"
        />
        <StatsCard
          title="Total Vendors"
          value="18"
          icon={Building2}
          description="Active vendors"
          trend="+3 this month"
          className="border-l-4 border-l-orange-500"
        />
        <StatsCard
          title="Total Machines"
          value="45"
          icon={Settings}
          description="Registered machines"
          trend="+8 this month"
          className="border-l-4 border-l-purple-500"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="villages">Villages</TabsTrigger>
          <TabsTrigger value="farmers">Farmers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest registrations and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">New Village Registered</p>
                      <p className="text-xs text-muted-foreground">Krishnapur, Lucknow</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">2 hours ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">New VLE Added</p>
                      <p className="text-xs text-muted-foreground">Rajesh Kumar</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">4 hours ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Machine Registered</p>
                      <p className="text-xs text-muted-foreground">Tractor - John Deere</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">6 hours ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <MapPin className="h-6 w-6 mb-2" />
                    Add Village
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <UserCheck className="h-6 w-6 mb-2" />
                    Add VLE
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Building2 className="h-6 w-6 mb-2" />
                    Add Vendor
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Settings className="h-6 w-6 mb-2" />
                    Register Machine
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="villages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Village Distribution</CardTitle>
              <CardDescription>Villages by district</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {districtDistributionData.map((district) => (
                  <div key={district.district} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{district.district}</span>
                      <span className="text-muted-foreground">
                        {district.vles} villages ({district.percentage}%)
                      </span>
                    </div>
                    <Progress value={district.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="farmers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Farmer Statistics</CardTitle>
              <CardDescription>Overview of farmer registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">1,240</p>
                  <p className="text-sm text-muted-foreground">Total Farmers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">45</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">+12%</p>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  // VLE Dashboard Content
  const VLEDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total VLEs"
          value={totalVLEs.toString()}
          icon={Users}
          description="Active entrepreneurs"
          trend="+3 this month"
          className="border-l-4 border-l-blue-500"
        />
        <StatsCard
          title="Total Income"
          value={`₹${(totalIncome / 100000).toFixed(1)}L`}
          icon={DollarSign}
          description="Combined earnings"
          trend="+15% from last month"
          className="border-l-4 border-l-green-500"
        />
        <StatsCard
          title="Avg Monthly Income"
          value={`₹${Math.round(avgMonthlyIncome / 1000)}K`}
          icon={TrendingUp}
          description="Per VLE"
          trend="+8% improvement"
          className="border-l-4 border-l-orange-500"
        />
        <StatsCard
          title="Total Customers"
          value={totalCustomers.toString()}
          icon={Activity}
          description="Farmers served"
          trend="+12 new customers"
          className="border-l-4 border-l-purple-500"
        />
      </div>

      {/* Detailed VLE List */}
      {showDetailedView && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              All VLEs - Income Details
            </CardTitle>
            <CardDescription>
              Complete list of Village Level Entrepreneurs with their performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vleData.map((vle) => (
                <div key={vle.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{vle.name}</p>
                        <Badge variant="secondary">{vle.id}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <MapPin className="inline w-3 h-3 mr-1" />
                        {vle.village}, {vle.district}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {vle.machinesOwned} machines • {vle.customersServed} customers
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{(vle.totalIncome / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground">
                      Total Income
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      ₹{vle.monthlyIncome.toLocaleString()}/month
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Earnings Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Monthly Earnings Trend
                </CardTitle>
                <CardDescription>Combined VLE earnings over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyEarningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Earnings']} />
                    <Bar dataKey="earnings" fill="#3b82f6" name="Earnings" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Performing VLEs */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing VLEs</CardTitle>
                <CardDescription>Highest earners this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vleData
                    .sort((a, b) => b.monthlyIncome - a.monthlyIncome)
                    .slice(0, 5)
                    .map((vle, index) => (
                    <div key={vle.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{vle.name}</p>
                          <p className="text-xs text-muted-foreground">{vle.village}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">₹{vle.monthlyIncome.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">This month</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">₹{(totalIncome / 100000).toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">All time combined</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Monthly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹{Math.round(avgMonthlyIncome / 1000)}K</p>
                <p className="text-sm text-muted-foreground">Per VLE</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">+15%</p>
                <p className="text-sm text-muted-foreground">From last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="machines" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Machine Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Machine Type Distribution
                </CardTitle>
                <CardDescription>Types of machines owned by VLEs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {machineTypeData.map((machine) => (
                    <div key={machine.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{machine.type}</span>
                        <span className="text-muted-foreground">
                          {machine.count} machines ({machine.percentage}%)
                        </span>
                      </div>
                      <Progress value={machine.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* VLE Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  VLE Locations Map
                </CardTitle>
                <CardDescription>Interactive map showing VLE locations across Madhya Pradesh</CardDescription>
              </CardHeader>
              <CardContent>
                <VLEMap vles={vleData} height="300px" />
              </CardContent>
            </Card>
          </div>

          {/* Machine Summary Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="w-5 h-5" />
                Machine Distribution Summary
              </CardTitle>
              <CardDescription>
                Overview of machine types and VLE locations across Madhya Pradesh
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{machineTypeData.reduce((sum, machine) => sum + machine.count, 0)}</div>
                  <div className="text-sm font-medium text-blue-800">Total Machines</div>
                  <div className="text-xs text-blue-600">Across all VLEs</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{machineTypeData.length}</div>
                  <div className="text-sm font-medium text-green-800">Machine Types</div>
                  <div className="text-xs text-green-600">Different categories</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{Math.round(machineTypeData.reduce((sum, machine) => sum + machine.count, 0) / vleData.length)}</div>
                  <div className="text-sm font-medium text-orange-800">Avg Machines/VLE</div>
                  <div className="text-xs text-orange-600">Per entrepreneur</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{vleData.length}</div>
                  <div className="text-sm font-medium text-purple-800">VLEs with Machines</div>
                  <div className="text-xs text-purple-600">Active entrepreneurs</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-3">Machine Type Breakdown:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {machineTypeData.map((machine) => (
                    <div key={machine.type} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm font-medium">{machine.type}</span>
                      <Badge variant="secondary" className="text-xs">{machine.count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* District Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  VLE Distribution by District
                </CardTitle>
                <CardDescription>Geographic spread of VLEs across Madhya Pradesh</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {districtDistributionData.map((district) => (
                    <div key={district.district} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{district.district}</span>
                        <span className="text-muted-foreground">
                          {district.vles} VLEs ({district.percentage}%)
                        </span>
                      </div>
                      <Progress value={district.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance by District */}
            <Card>
              <CardHeader>
                <CardTitle>Average Income by District</CardTitle>
                <CardDescription>Monthly earnings per VLE by location in Madhya Pradesh</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Bhopal</p>
                      <p className="text-sm text-muted-foreground">1 VLE</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹45,600</p>
                      <p className="text-sm text-muted-foreground">Avg/month</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Indore</p>
                      <p className="text-sm text-muted-foreground">1 VLE</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹38,900</p>
                      <p className="text-sm text-muted-foreground">Avg/month</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Jabalpur</p>
                      <p className="text-sm text-muted-foreground">1 VLE</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹52,300</p>
                      <p className="text-sm text-muted-foreground">Avg/month</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Gwalior</p>
                      <p className="text-sm text-muted-foreground">1 VLE</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹31,200</p>
                      <p className="text-sm text-muted-foreground">Avg/month</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Ujjain</p>
                      <p className="text-sm text-muted-foreground">1 VLE</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹44,500</p>
                      <p className="text-sm text-muted-foreground">Avg/month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* District Summary Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Madhya Pradesh VLE Coverage Summary
              </CardTitle>
              <CardDescription>
                Overview of VLE distribution across Madhya Pradesh districts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{vleData.length}</div>
                  <div className="text-sm font-medium text-blue-800">Total VLEs</div>
                  <div className="text-xs text-blue-600">Across Madhya Pradesh</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{districtDistributionData.length}</div>
                  <div className="text-sm font-medium text-green-800">Districts Covered</div>
                  <div className="text-xs text-green-600">Out of 52 districts</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">15.4%</div>
                  <div className="text-sm font-medium text-orange-800">Coverage Rate</div>
                  <div className="text-xs text-orange-600">Districts with VLEs</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">₹{Math.round(avgMonthlyIncome / 1000)}K</div>
                  <div className="text-sm font-medium text-purple-800">Avg Monthly Income</div>
                  <div className="text-xs text-purple-600">Per VLE</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-3">District-wise VLE Distribution:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {districtDistributionData.map((district) => (
                    <div key={district.district} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm font-medium">{district.district}</span>
                      <Badge variant="secondary" className="text-xs">{district.vles} VLE</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header with Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            {isVLEDashboard ? "VLE Performance Overview" : "System Overview"}
          </p>
        </div>
        <div className="flex gap-2">
          {isVLEDashboard && (
            <Button onClick={() => setShowDetailedView(!showDetailedView)} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              {showDetailedView ? "Hide Details" : "View All VLEs"}
            </Button>
          )}
          <Button 
            onClick={() => setIsVLEDashboard(!isVLEDashboard)}
            className="bg-primary hover:bg-primary/90"
          >
            {isVLEDashboard ? "System Dashboard" : "VLE Dashboard"}
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      {isVLEDashboard ? <VLEDashboard /> : <RegularDashboard />}
    </div>
  )
}

export default Dashboard
