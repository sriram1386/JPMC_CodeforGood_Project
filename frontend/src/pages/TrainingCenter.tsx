
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Download, BookOpen, Video, FileText, Search, Clock, Users } from "lucide-react"

const TrainingCenter = () => {
  const trainingVideos = [
    {
      id: 1,
      title: "Tractor Operation & Maintenance",
      duration: "45 mins",
      category: "Machine Operation",
      level: "Beginner",
      views: 1250,
      thumbnail: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Harvester Best Practices",
      duration: "32 mins",
      category: "Machine Operation",
      level: "Intermediate",
      views: 890,
      thumbnail: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Business Planning for VLEs",
      duration: "28 mins",
      category: "Business",
      level: "Beginner",
      views: 670,
      thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Customer Service Excellence",
      duration: "22 mins",
      category: "Business",
      level: "Intermediate",
      views: 520,
      thumbnail: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop"
    }
  ]

  const guides = [
    {
      id: 1,
      title: "Complete VLE Handbook",
      type: "PDF Guide",
      pages: 45,
      category: "General",
      downloadCount: 2100
    },
    {
      id: 2,
      title: "Machine Safety Protocols",
      type: "PDF Guide",
      pages: 12,
      category: "Safety",
      downloadCount: 1800
    },
    {
      id: 3,
      title: "Pricing Strategy Guide",
      type: "PDF Guide",
      pages: 18,
      category: "Business",
      downloadCount: 1500
    },
    {
      id: 4,
      title: "Seasonal Crop Calendar",
      type: "PDF Guide",
      pages: 8,
      category: "Agriculture",
      downloadCount: 2500
    }
  ]

  const businessPlanningResources = [
    {
      id: 1,
      title: "VLE Business Model Canvas",
      type: "Template",
      description: "Ready-to-use business model template for VLE operations"
    },
    {
      id: 2,
      title: "Financial Planning Worksheet",
      type: "Excel Template",
      description: "Track income, expenses, and profitability"
    },
    {
      id: 3,
      title: "Service Rate Calculator",
      type: "Tool",
      description: "Calculate optimal pricing for your services"
    },
    {
      id: 4,
      title: "Customer Database Template",
      type: "Excel Template",
      description: "Manage customer information and service history"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Training & Resource Center</h1>
          <p className="text-muted-foreground">Access training materials, guides, and business planning resources</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search resources..." className="pl-9 w-64" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="videos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="videos">Training Videos</TabsTrigger>
          <TabsTrigger value="guides">Guides & Manuals</TabsTrigger>
          <TabsTrigger value="business">Business Planning</TabsTrigger>
          <TabsTrigger value="tools">Tools & Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingVideos.map((video) => (
              <Card key={video.id} className="hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-t-lg opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="icon" className="rounded-full">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/75 text-white">
                    {video.duration}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <Badge variant="secondary">{video.category}</Badge>
                    <Badge variant={video.level === 'Beginner' ? 'default' : 'outline'}>
                      {video.level}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {video.views} views
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription>{guide.type} • {guide.pages} pages</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{guide.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {guide.downloadCount} downloads
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessPlanningResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.type}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-primary" />
                  Machine Usage Tracker
                </CardTitle>
                <CardDescription>Track hours and maintenance schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Launch Tool</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Service Request Form
                </CardTitle>
                <CardDescription>Template for customer service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Time Tracking Sheet
                </CardTitle>
                <CardDescription>Log work hours and calculate payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TrainingCenter
