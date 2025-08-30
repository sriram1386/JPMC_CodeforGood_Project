import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useForm } from "react-hook-form"
import { Building2, ChevronsUpDown, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Dummy machine data for dropdown
const dummyMachines = [
  { id: 1, name: "Tractor - John Deere 5050D", type: "Tractor", capacity: "50 HP" },
  { id: 2, name: "Harvester - Kubota DC60", type: "Harvester", capacity: "60 HP" },
  { id: 3, name: "Seeder - Mahindra 475", type: "Seeder", capacity: "47 HP" },
  { id: 4, name: "Thresher - New Holland TC45", type: "Thresher", capacity: "45 HP" },
  { id: 5, name: "Water Pump - Kirloskar 5HP", type: "Water Pump", capacity: "5 HP" },
  { id: 6, name: "Sprayer - Honda FJ500", type: "Sprayer", capacity: "500L Tank" },
  { id: 7, name: "Tractor - Swaraj 744", type: "Tractor", capacity: "44 HP" },
  { id: 8, name: "Cultivator - Massey Ferguson 1035", type: "Cultivator", capacity: "35 HP" },
  { id: 9, name: "Plough - Mahindra 275", type: "Plough", capacity: "27 HP" },
  { id: 10, name: "Rotavator - Kubota L3408", type: "Rotavator", capacity: "34 HP" }
]

const VendorOnboarding = () => {
  const { toast } = useToast()
  const [selectedMachine, setSelectedMachine] = useState<string>("")
  const [isMachineOpen, setIsMachineOpen] = useState(false)
  const form = useForm()

  const handleMachineSelect = (machineName: string) => {
    setSelectedMachine(machineName)
    setIsMachineOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const vendorData = {
      name: formData.get('name'),
      contact: formData.get('contact'),
      address: formData.get('address'),
      machineSupplied: selectedMachine
    }
    console.log("Vendor data submitted:", vendorData)
    toast({
      title: "Vendor Registered Successfully",
      description: "Vendor has been added to the system.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Vendor Onboarding</h1>
        <p className="text-muted-foreground">Register a new vendor in the system</p>
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Vendor Information
          </CardTitle>
          <CardDescription>
            Please fill in all required information accurately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Vendor Name *</Label>
                <Input id="name" name="name" placeholder="Enter vendor name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number *</Label>
                <Input id="contact" name="contact" placeholder="Enter contact number" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea 
                  id="address" 
                  name="address" 
                  placeholder="Enter complete address" 
                  rows={3}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="machine">Machine Supplied *</Label>
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

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Add Vendor
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default VendorOnboarding 