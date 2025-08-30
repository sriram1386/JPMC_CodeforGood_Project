import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useForm } from "react-hook-form"
import { User, ChevronsUpDown, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Dummy village data for dropdown
const dummyVillages = [
  { id: 1, name: "Krishnapur", district: "Lucknow", subDistrict: "Malihabad" },
  { id: 2, name: "Ramgarh", district: "Kanpur", subDistrict: "Bilhaur" },
  { id: 3, name: "Mahila Mandal", district: "Varanasi", subDistrict: "Pindra" },
  { id: 4, name: "Green Valley", district: "Prayagraj", subDistrict: "Karchana" },
  { id: 5, name: "Sundarpur", district: "Gorakhpur", subDistrict: "Sahjanwa" },
  { id: 6, name: "Devipur", district: "Azamgarh", subDistrict: "Sagri" },
  { id: 7, name: "Lakshmipur", district: "Jaunpur", subDistrict: "Shahganj" },
  { id: 8, name: "Gopalpur", district: "Sultanpur", subDistrict: "Kadipur" }
]

// Dummy machine data for dropdown
const dummyMachines = [
  { id: 1, name: "Tractor - John Deere 5050D", type: "Tractor", capacity: "50 HP" },
  { id: 2, name: "Harvester - Kubota DC60", type: "Harvester", capacity: "60 HP" },
  { id: 3, name: "Seeder - Mahindra 475", type: "Seeder", capacity: "47 HP" },
  { id: 4, name: "Thresher - New Holland TC45", type: "Thresher", capacity: "45 HP" },
  { id: 5, name: "Water Pump - Kirloskar 5HP", type: "Water Pump", capacity: "5 HP" },
  { id: 6, name: "Sprayer - Honda FJ500", type: "Sprayer", capacity: "500L Tank" },
  { id: 7, name: "Tractor - Swaraj 744", type: "Tractor", capacity: "44 HP" },
  { id: 8, name: "Cultivator - Massey Ferguson 1035", type: "Cultivator", capacity: "35 HP" }
]

const VLEOnboarding = () => {
  const { toast } = useToast()
  const [selectedVillage, setSelectedVillage] = useState<string>("")
  const [selectedMachine, setSelectedMachine] = useState<string>("")
  const [isVillageOpen, setIsVillageOpen] = useState(false)
  const [isMachineOpen, setIsMachineOpen] = useState(false)
  const form = useForm()

  const handleVillageSelect = (villageName: string) => {
    setSelectedVillage(villageName)
    setIsVillageOpen(false)
  }

  const handleMachineSelect = (machineName: string) => {
    setSelectedMachine(machineName)
    setIsMachineOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("VLE data submitted:", { selectedVillage, selectedMachine })
    toast({
      title: "VLE Registered Successfully",
      description: "Village Level Entrepreneur has been added to the system.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">VLE Onboarding</h1>
        <p className="text-muted-foreground">Register as a Village Level Entrepreneur</p>
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Please fill in all required information accurately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="Enter full name" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="Enter phone number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="village">Village *</Label>
                <Collapsible
                  open={isVillageOpen}
                  onOpenChange={setIsVillageOpen}
                  className="w-full"
                >
                  <div className="flex items-center justify-between gap-4 px-3 py-2 border rounded-md">
                    <span className={selectedVillage ? "text-foreground" : "text-muted-foreground"}>
                      {selectedVillage || "Select a village"}
                    </span>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle village selection</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-2">
                    <div className="border rounded-md max-h-60 overflow-y-auto">
                      {dummyVillages.map((village) => (
                        <div
                          key={village.id}
                          className="px-3 py-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                          onClick={() => handleVillageSelect(village.name)}
                        >
                          <div className="font-medium">{village.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {village.district} • {village.subDistrict}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              <div className="space-y-2">
                <Label htmlFor="machine">Assign Machine *</Label>
                <Collapsible
                  open={isMachineOpen}
                  onOpenChange={setIsMachineOpen}
                  className="w-full"
                >
                  <div className="flex items-center justify-between gap-4 px-3 py-2 border rounded-md">
                    <span className={selectedMachine ? "text-foreground" : "text-muted-foreground"}>
                      {selectedMachine || "Select a machine"}
                    </span>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle machine selection</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-2">
                    <div className="border rounded-md max-h-60 overflow-y-auto">
                      {dummyMachines.map((machine) => (
                        <div
                          key={machine.id}
                          className="px-3 py-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                          onClick={() => handleMachineSelect(machine.name)}
                        >
                          <div className="font-medium">{machine.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {machine.type} • {machine.capacity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalIncome">Total Income (₹)</Label>
                  <Input id="totalIncome" type="number" placeholder="Enter annual income" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acres">Land in Acres</Label>
                  <Input id="acres" type="number" placeholder="Enter land area in acres" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Register VLE
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default VLEOnboarding
