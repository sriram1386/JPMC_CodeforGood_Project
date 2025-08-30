
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, Users, Calendar, Plus, Edit, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CommunityGroup {
  id: number
  name: string
  type: string
  village: string
  members: number
  leader: string
  formed: string
  lastMeeting: string
  nextMeeting: string
  status: string
}

const CommunityStructures = () => {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("list")
  const [searchTerm, setSearchTerm] = useState("")
  
  const [formData, setFormData] = useState({
    groupName: "",
    groupType: "",
    village: "",
    leader: "",
    leaderContact: "",
    totalMembers: "",
    femaleMembers: "",
    maleMembers: "",
    formationDate: "",
    registrationNumber: "",
    bankAccount: "",
    primaryActivity: "",
    meetingFrequency: "",
    lastMeetingDate: "",
    nextMeetingDate: "",
    notes: ""
  })

  // Mock community groups data
  const communityGroups: CommunityGroup[] = [
    { id: 1, name: "Mahila Mandal", type: "SHG", village: "Krishnapur", members: 12, leader: "Sita Devi", formed: "2023-01-15", lastMeeting: "2024-06-10", nextMeeting: "2024-06-24", status: "Active" },
    { id: 2, name: "Kisan Producer Group", type: "FPO", village: "Ramgarh", members: 45, leader: "Ram Singh", formed: "2022-05-20", lastMeeting: "2024-06-08", nextMeeting: "2024-06-22", status: "Active" },
    { id: 3, name: "Youth Development Club", type: "SHG", village: "Govindpur", members: 18, leader: "Amit Kumar", formed: "2023-08-10", lastMeeting: "2024-05-25", nextMeeting: "2024-06-30", status: "Active" },
    { id: 4, name: "Dairy Cooperative", type: "Cooperative", village: "Shivnagar", members: 32, leader: "Mohan Lal", formed: "2021-11-05", lastMeeting: "2024-06-05", nextMeeting: "2024-06-19", status: "Inactive" },
  ]

  const filteredGroups = communityGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Community group data submitted:", formData)
    toast({
      title: "Community Group Created Successfully",
      description: `${formData.groupName} has been registered in the system.`,
    })
    setActiveTab("list")
    // Reset form
    setFormData({
      groupName: "", groupType: "", village: "", leader: "", leaderContact: "",
      totalMembers: "", femaleMembers: "", maleMembers: "", formationDate: "",
      registrationNumber: "", bankAccount: "", primaryActivity: "", meetingFrequency: "",
      lastMeetingDate: "", nextMeetingDate: "", notes: ""
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-agri-green-500 text-white">Active</Badge>
      case "Inactive":
        return <Badge variant="destructive">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "SHG":
        return <Badge className="bg-agri-orange-500 text-white">SHG</Badge>
      case "FPO":
        return <Badge className="bg-agri-brown-500 text-white">FPO</Badge>
      case "Cooperative":
        return <Badge className="bg-blue-500 text-white">Cooperative</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Structures</h1>
          <p className="text-muted-foreground">Manage SHGs, FPOs, cooperatives and their activities</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Community Groups
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Group
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Search Community Groups</CardTitle>
              <CardDescription>Find groups by name, village, or type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search community groups..."
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

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-agri-orange-500">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">
                  {communityGroups.filter(g => g.type === "SHG").length}
                </div>
                <p className="text-sm text-muted-foreground">Self-Help Groups</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-agri-brown-500">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">
                  {communityGroups.filter(g => g.type === "FPO").length}
                </div>
                <p className="text-sm text-muted-foreground">FPOs</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">
                  {communityGroups.filter(g => g.type === "Cooperative").length}
                </div>
                <p className="text-sm text-muted-foreground">Cooperatives</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-agri-green-500">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">
                  {communityGroups.reduce((sum, g) => sum + g.members, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </CardContent>
            </Card>
          </div>

          {/* Groups List */}
          <Card>
            <CardHeader>
              <CardTitle>Community Groups ({filteredGroups.length})</CardTitle>
              <CardDescription>All registered community structures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGroups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{group.name}</h3>
                            {getTypeBadge(group.type)}
                            {getStatusBadge(group.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">{group.village}</span> • 
                            <span className="ml-1">{group.members} members</span> • 
                            <span className="ml-1">Leader: {group.leader}</span>
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Formed: {group.formed}</span>
                            <span>Last Meeting: {group.lastMeeting}</span>
                            <span className="text-agri-green-600 font-medium">Next: {group.nextMeeting}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Group Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Basic Group Information
                </CardTitle>
                <CardDescription>Enter the fundamental details about the community group</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName">Group Name *</Label>
                  <Input 
                    id="groupName"
                    value={formData.groupName}
                    onChange={(e) => handleInputChange("groupName", e.target.value)}
                    placeholder="Enter group name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupType">Group Type *</Label>
                  <Select value={formData.groupType} onValueChange={(value) => handleInputChange("groupType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select group type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SHG">Self-Help Group (SHG)</SelectItem>
                      <SelectItem value="FPO">Farmer Producer Organization (FPO)</SelectItem>
                      <SelectItem value="Cooperative">Cooperative Society</SelectItem>
                      <SelectItem value="Youth Club">Youth Club</SelectItem>
                      <SelectItem value="Women Group">Women's Group</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="formationDate">Formation Date</Label>
                  <Input 
                    id="formationDate"
                    value={formData.formationDate}
                    onChange={(e) => handleInputChange("formationDate", e.target.value)}
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input 
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                    placeholder="Official registration number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Bank Account Number</Label>
                  <Input 
                    id="bankAccount"
                    value={formData.bankAccount}
                    onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                    placeholder="Group bank account"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Leadership & Members */}
            <Card>
              <CardHeader>
                <CardTitle className="text-agri-orange-700">Leadership & Membership</CardTitle>
                <CardDescription>Leader information and member statistics</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leader">Group Leader/President *</Label>
                  <Input 
                    id="leader"
                    value={formData.leader}
                    onChange={(e) => handleInputChange("leader", e.target.value)}
                    placeholder="Leader name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leaderContact">Leader Contact</Label>
                  <Input 
                    id="leaderContact"
                    value={formData.leaderContact}
                    onChange={(e) => handleInputChange("leaderContact", e.target.value)}
                    placeholder="Contact number"
                    type="tel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalMembers">Total Members</Label>
                  <Input 
                    id="totalMembers"
                    value={formData.totalMembers}
                    onChange={(e) => handleInputChange("totalMembers", e.target.value)}
                    placeholder="Total member count"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="femaleMembers">Female Members</Label>
                  <Input 
                    id="femaleMembers"
                    value={formData.femaleMembers}
                    onChange={(e) => handleInputChange("femaleMembers", e.target.value)}
                    placeholder="Female member count"
                    type="number"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Activities & Meetings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-agri-green-700">Activities & Meetings</CardTitle>
                <CardDescription>Primary activities and meeting schedules</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryActivity">Primary Activity</Label>
                  <Select value={formData.primaryActivity} onValueChange={(value) => handleInputChange("primaryActivity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings-credit">Savings & Credit</SelectItem>
                      <SelectItem value="agriculture">Agriculture Development</SelectItem>
                      <SelectItem value="livestock">Livestock Management</SelectItem>
                      <SelectItem value="skill-development">Skill Development</SelectItem>
                      <SelectItem value="marketing">Collective Marketing</SelectItem>
                      <SelectItem value="social-welfare">Social Welfare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meetingFrequency">Meeting Frequency</Label>
                  <Select value={formData.meetingFrequency} onValueChange={(value) => handleInputChange("meetingFrequency", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastMeetingDate">Last Meeting Date</Label>
                  <Input 
                    id="lastMeetingDate"
                    value={formData.lastMeetingDate}
                    onChange={(e) => handleInputChange("lastMeetingDate", e.target.value)}
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextMeetingDate">Next Meeting Date</Label>
                  <Input 
                    id="nextMeetingDate"
                    value={formData.nextMeetingDate}
                    onChange={(e) => handleInputChange("nextMeetingDate", e.target.value)}
                    type="date"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Any other relevant details about the community group</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Goals, challenges, achievements, special programs, etc."
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
                Create Community Group
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CommunityStructures
