import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { ClipboardList, Save, CalendarIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const ConductSurvey = () => {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [otherChallenge, setOtherChallenge] = useState<string>("")
  const [otherCrop, setOtherCrop] = useState<string>("")
  const form = useForm()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    // Get the selected challenge, handling "Other" case
    const challengeSelection = formData.get('challenge') as string
    const finalChallenge = challengeSelection === 'other' ? otherChallenge : challengeSelection
    
    // Get the selected crop, handling "Other" case
    const cropSelection = formData.get('crop') as string
    const finalCrop = cropSelection === 'other' ? otherCrop : cropSelection

    const surveyData = {
      village: formData.get('village'),
      farmername: formData.get('farmername'),
      farmercontact: formData.get('farmercontact'),
      problemtype: finalChallenge,
      croptype: finalCrop,
      reportedBy: formData.get('reportedBy'),
      createdAt: date ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      willingtobevle: formData.get('willingtobevle')
    }
    
    console.log("Survey data submitted:", surveyData)
    toast({
      title: "Survey Submitted Successfully",
      description: "Thank you for participating in the survey.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">📋 Conduct a Survey</h1>
        <p className="text-muted-foreground">Collect information from farmers about their challenges and needs</p>
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            Farmer Survey Form
          </CardTitle>
          <CardDescription>
            Please fill in all required information accurately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Village Name */}
              <div className="space-y-2">
                <Label htmlFor="village">1️⃣ What is the name of your village? *</Label>
                <Input 
                  id="village" 
                  name="village" 
                  placeholder="Enter village name" 
                  required 
                />
              </div>

              {/* 2. Farmer Name */}
              <div className="space-y-2">
                <Label htmlFor="farmername">2️⃣ What is your full name? *</Label>
                <Input 
                  id="farmername" 
                  name="farmername" 
                  placeholder="Enter your full name" 
                  required 
                />
              </div>

              {/* 3. Contact Number */}
              <div className="space-y-2">
                <Label htmlFor="farmercontact">3️⃣ What is your contact number? *</Label>
                <Input 
                  id="farmercontact" 
                  name="farmercontact" 
                  type="tel"
                  placeholder="Enter your contact number" 
                  required 
                />
              </div>

              {/* 4. Major Challenge */}
              <div className="space-y-2">
                <Label>4️⃣ What is the major challenge you are facing in your farming activities? *</Label>
                <RadioGroup name="challenge" required>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="operational" id="operational" />
                      <Label htmlFor="operational">Operational</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="environmental" id="environmental" />
                      <Label htmlFor="environmental">Environmental</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="labour" id="labour" />
                      <Label htmlFor="labour">Labour</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="harvest" id="harvest" />
                      <Label htmlFor="harvest">Harvest</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* 5. Main Crop */}
              <div className="space-y-2">
                <Label>5️⃣ What is your main crop? *</Label>
                <RadioGroup name="crop" required>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paddy" id="paddy" />
                      <Label htmlFor="paddy">Paddy (rice)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wheat" id="wheat" />
                      <Label htmlFor="wheat">Wheat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maize" id="maize" />
                      <Label htmlFor="maize">Maize</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other-crop" />
                      <Label htmlFor="other-crop">Other</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* 6. Reported By */}
              <div className="space-y-2">
                <Label htmlFor="reportedBy">6️⃣ Who is collecting this information? (Reported by) *</Label>
                <Input 
                  id="reportedBy" 
                  name="reportedBy" 
                  placeholder="Enter volunteer/staff name" 
                  required 
                />
              </div>

              {/* 7. Collection Date */}
              <div className="space-y-2">
                <Label>7️⃣ When is this information being collected? *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* 8. Willing to be VLE */}
              <div className="space-y-2">
                <Label>8️⃣ Are you interested in becoming a Village Level Entrepreneur (VLE) to run agricultural machinery as a service? *</Label>
                <RadioGroup name="willingtobevle" required>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes-vle" />
                      <Label htmlFor="yes-vle">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no-vle" />
                      <Label htmlFor="no-vle">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Submit Survey
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ConductSurvey 