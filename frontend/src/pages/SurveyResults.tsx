import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ClipboardList, 
  Users, 
  MapPin, 
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
  Filter
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

// Mock survey results data
const surveyResults = [
  {
    id: 1,
    village: "Krishnapur",
    farmerName: "Rajesh Kumar",
    contact: "9876543210",
    challenge: "operational",
    crop: "paddy",
    reportedBy: "Priya Sharma",
    createdAt: "2024-01-15",
    willingToBeVLE: "yes"
  },
  {
    id: 2,
    village: "Ramgarh",
    farmerName: "Suresh Patel",
    contact: "9876543211",
    challenge: "environmental",
    crop: "wheat",
    reportedBy: "Amit Singh",
    createdAt: "2024-01-14",
    willingToBeVLE: "no"
  },
  {
    id: 3,
    village: "Mahila Mandal",
    farmerName: "Lakshmi Devi",
    contact: "9876543212",
    challenge: "labour",
    crop: "paddy",
    reportedBy: "Rajesh Kumar",
    createdAt: "2024-01-13",
    willingToBeVLE: "yes"
  },
  {
    id: 4,
    village: "Green Valley",
    farmerName: "Amit Singh",
    contact: "9876543213",
    challenge: "harvest",
    crop: "maize",
    reportedBy: "Priya Sharma",
    createdAt: "2024-01-12",
    willingToBeVLE: "yes"
  },
  {
    id: 5,
    village: "Sundarpur",
    farmerName: "Priya Sharma",
    contact: "9876543214",
    challenge: "operational",
    crop: "wheat",
    reportedBy: "Amit Singh",
    createdAt: "2024-01-11",
    willingToBeVLE: "no"
  },
  {
    id: 6,
    village: "Devipur",
    farmerName: "Ramesh Kumar",
    contact: "9876543215",
    challenge: "environmental",
    crop: "paddy",
    reportedBy: "Lakshmi Devi",
    createdAt: "2024-01-10",
    willingToBeVLE: "yes"
  },
  {
    id: 7,
    village: "Gopalpur",
    farmerName: "Sunita Devi",
    contact: "9876543216",
    challenge: "labour",
    crop: "maize",
    reportedBy: "Rajesh Kumar",
    createdAt: "2024-01-09",
    willingToBeVLE: "no"
  },
  {
    id: 8,
    village: "Lakshmipur",
    farmerName: "Mohan Singh",
    contact: "9876543217",
    challenge: "harvest",
    crop: "wheat",
    reportedBy: "Priya Sharma",
    createdAt: "2024-01-08",
    willingToBeVLE: "yes"
  }
]

// Chart data
const challengeData = [
  { name: "Operational", value: 25, color: "#3b82f6" },
  { name: "Environmental", value: 20, color: "#10b981" },
  { name: "Labour", value: 30, color: "#f59e0b" },
  { name: "Harvest", value: 25, color: "#ef4444" }
]

const cropData = [
  { name: "Paddy (Rice)", value: 40, color: "#22c55e" },
  { name: "Wheat", value: 35, color: "#fbbf24" },
  { name: "Maize", value: 25, color: "#fb923c" }
]

const vleInterestData = [
  { name: "Interested", value: 62.5, color: "#10b981" },
  { name: "Not Interested", value: 37.5, color: "#ef4444" }
]

const villageData = [
  { village: "Krishnapur", surveys: 12, percentage: 15 },
  { village: "Ramgarh", surveys: 10, percentage: 12.5 },
  { village: "Mahila Mandal", surveys: 8, percentage: 10 },
  { village: "Green Valley", surveys: 15, percentage: 18.75 },
  { village: "Sundarpur", surveys: 6, percentage: 7.5 },
  { village: "Devipur", surveys: 9, percentage: 11.25 },
  { village: "Gopalpur", surveys: 7, percentage: 8.75 },
  { village: "Lakshmipur", surveys: 13, percentage: 16.25 }
]

const SurveyResults = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  const totalSurveys = surveyResults.length
  const totalVillages = new Set(surveyResults.map(s => s.village)).size
  const totalFarmers = surveyResults.length
  const willingToBeVLE = surveyResults.filter(s => s.willingToBeVLE === "yes").length
  const vlePercentage = (willingToBeVLE / totalSurveys) * 100

  const filteredResults = selectedFilter === "all" 
    ? surveyResults 
    : surveyResults.filter(s => s.challenge === selectedFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">📊 Survey Results</h1>
          <p className="text-muted-foreground">Analysis of farmer survey responses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Surveys</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSurveys}</div>
            <p className="text-xs text-muted-foreground">Completed surveys</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Villages Covered</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVillages}</div>
            <p className="text-xs text-muted-foreground">Unique villages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farmers Surveyed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFarmers}</div>
            <p className="text-xs text-muted-foreground">Individual farmers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VLE Interest</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vlePercentage.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">{willingToBeVLE} farmers interested</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="crops">Crops</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* VLE Interest Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  VLE Interest Distribution
                </CardTitle>
                <CardDescription>Percentage of farmers interested in becoming VLEs</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={vleInterestData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {vleInterestData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  {vleInterestData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {item.name} ({item.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Village Survey Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Survey Distribution by Village</CardTitle>
                <CardDescription>Number of surveys conducted per village</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {villageData
                    .sort((a, b) => b.surveys - a.surveys)
                    .slice(0, 6)
                    .map((village) => (
                    <div key={village.village} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{village.village}</span>
                        <span className="text-muted-foreground">
                          {village.surveys} surveys ({village.percentage}%)
                        </span>
                      </div>
                      <Progress value={village.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Challenge Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Major Challenges Faced
                </CardTitle>
                <CardDescription>Distribution of challenges reported by farmers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={challengeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Bar dataKey="value" fill="#3b82f6" name="Percentage" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Challenge Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Challenge Analysis</CardTitle>
                <CardDescription>Detailed breakdown of farming challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challengeData.map((challenge) => (
                    <div key={challenge.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{challenge.name}</span>
                        <span className="text-muted-foreground">{challenge.value}%</span>
                      </div>
                      <Progress value={challenge.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crops" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Crop Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Main Crops Grown
                </CardTitle>
                <CardDescription>Distribution of primary crops among surveyed farmers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={cropData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {cropData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  {cropData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {item.name} ({item.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Crop vs Challenge Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Crop-Challenge Correlation</CardTitle>
                <CardDescription>Challenges faced by crop type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Paddy (Rice)</h4>
                    <p className="text-xs text-muted-foreground">Most common challenges: Labour (40%), Environmental (30%)</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Wheat</h4>
                    <p className="text-xs text-muted-foreground">Most common challenges: Operational (35%), Harvest (25%)</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Maize</h4>
                    <p className="text-xs text-muted-foreground">Most common challenges: Harvest (45%), Labour (30%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Survey Responses</CardTitle>
              <CardDescription>Complete list of survey responses with filters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredResults.map((survey) => (
                  <div key={survey.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{survey.farmerName}</p>
                          <Badge variant="secondary">{survey.village}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Contact: {survey.contact} • Reported by: {survey.reportedBy}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {survey.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{survey.challenge}</Badge>
                        <Badge variant="outline">{survey.crop}</Badge>
                      </div>
                      <Badge 
                        variant={survey.willingToBeVLE === "yes" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        VLE: {survey.willingToBeVLE === "yes" ? "Interested" : "Not Interested"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SurveyResults 