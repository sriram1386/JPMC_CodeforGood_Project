import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  MapPin, 
  Settings, 
  DollarSign, 
  Clock, 
  Users, 
  Activity,
  TrendingUp,
  Calendar,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Eye
} from "lucide-react"
import { StatsCard } from "@/components/StatsCard"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for VLEs
const vleData = [
  {
    id: "VLE001",
    name: "Rajesh Kumar",
    village: "Krishnapur",
    district: "Lucknow",
    totalIncome: 456000,
    monthlyIncome: 45600,
    machinesOwned: 3,
    customersServed: 42,
    status: "Active"
  },
  {
    id: "VLE002", 
    name: "Priya Sharma",
    village: "Ramgarh",
    district: "Kanpur",
    totalIncome: 389000,
    monthlyIncome: 38900,
    machinesOwned: 2,
    customersServed: 35,
    status: "Active"
  },
  {
    id: "VLE003",
    name: "Suresh Patel",
    village: "Mahila Mandal",
    district: "Varanasi", 
    totalIncome: 523000,
    monthlyIncome: 52300,
    machinesOwned: 4,
    customersServed: 48,
    status: "Active"
  },
  {
    id: "VLE004",
    name: "Lakshmi Devi",
    village: "Green Valley",
    district: "Prayagraj",
    totalIncome: 312000,
    monthlyIncome: 31200,
    machinesOwned: 2,
    customersServed: 28,
    status: "Active"
  },
  {
    id: "VLE005",
    name: "Amit Singh",
    village: "Sundarpur",
    district: "Gorakhpur",
    totalIncome: 445000,
    monthlyIncome: 44500,
    machinesOwned: 3,
    customersServed: 39,
    status: "Active"
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

const districtDistributionData = [
  { district: "Lucknow", vles: 8, percentage: 25 },
  { district: "Kanpur", vles: 6, percentage: 19 },
  { district: "Varanasi", vles: 5, percentage: 16 },
  { district: "Prayagraj", vles: 4, percentage: 13 },
  { district: "Gorakhpur", vles: 4, percentage: 13 },
  { district: "Others", vles: 5, percentage: 14 }
]

const VLEDashboard = () => {
  const [showDetailedView, setShowDetailedView] = useState(false)

  const totalVLEs = vleData.length
  const totalIncome = vleData.reduce((sum, vle) => sum + vle.totalIncome, 0)
  const avgMonthlyIncome = vleData.reduce((sum, vle) => sum + vle.monthlyIncome, 0) / totalVLEs
  const totalCustomers = vleData.reduce((sum, vle) => sum + vle.customersServed, 0)

  return (
    <div className="space-y-6">
      {/* Header with Profile */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome, Rajesh Kumar</h1>
            <p className="text-muted-foreground">VLE ID: VLE001 • Krishnapur, Ramgarh</p>
            <Badge variant="secondary" className="mt-1">Active VLE</Badge>
          </div>
        </div>
        <Button variant="outline">
          <User className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

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

            {/* Machine Utilization */}
            <Card>
              <CardHeader>
                <CardTitle>Machine Utilization</CardTitle>
                <CardDescription>Average usage across all VLEs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Tractors</span>
                      <span className="text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Harvesters</span>
                      <span className="text-muted-foreground">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Seeders</span>
                      <span className="text-muted-foreground">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Threshers</span>
                      <span className="text-muted-foreground">55%</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
                <CardDescription>Geographic spread of VLEs</CardDescription>
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
                <CardDescription>Monthly earnings per VLE by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Lucknow</p>
                      <p className="text-sm text-muted-foreground">8 VLEs</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹48,500</p>
                      <p className="text-sm text-muted-foreground">Avg/month</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Kanpur</p>
                      <p className="text-sm text-muted-foreground">6 VLEs</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹42,300</p>
                      <p className="text-sm text-muted-foreground">Avg/month</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Varanasi</p>
                      <p className="text-sm text-muted-foreground">5 VLEs</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹51,200</p>
                      <p className="text-sm text-muted-foreground">Avg/month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default VLEDashboard
