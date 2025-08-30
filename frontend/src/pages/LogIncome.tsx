import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { DollarSign, CalendarIcon, Save, TrendingUp } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface IncomeLog {
  id: string
  startDate: Date
  endDate: Date
  income: number
  createdAt: Date
}

const LogIncome = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [income, setIncome] = useState("")
  const [incomeLogs, setIncomeLogs] = useState<IncomeLog[]>([
    {
      id: "1",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-31"),
      income: 45600,
      createdAt: new Date("2024-01-31")
    },
    {
      id: "2",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-02-29"),
      income: 52300,
      createdAt: new Date("2024-02-29")
    }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const incomeAmount = parseFloat(income)

    if (!startDate || !endDate || !incomeAmount) {
      alert("Please fill in all required fields.")
      return
    }

    if (startDate > endDate) {
      alert("Start date must be before end date.")
      return
    }

    const newLog: IncomeLog = {
      id: Date.now().toString(),
      startDate,
      endDate,
      income: incomeAmount,
      createdAt: new Date()
    }

    setIncomeLogs([newLog, ...incomeLogs])
    
    // Reset form
    setStartDate(undefined)
    setEndDate(undefined)
    setIncome("")
  }

  const totalIncome = incomeLogs.reduce((sum, log) => sum + log.income, 0)
  const avgIncome = incomeLogs.length > 0 ? totalIncome / incomeLogs.length : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">💰 Log Income</h1>
          <p className="text-muted-foreground">Record your earnings from agricultural services</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Log New Income
              </CardTitle>
              <CardDescription>
                Record your income for a specific time period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick start date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Income Amount (₹) *</Label>
                  <Input 
                    id="income" 
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    type="number" 
                    placeholder="Enter income amount" 
                    required 
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Log Income
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">All time earnings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{Math.round(avgIncome).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Per period</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Income History</CardTitle>
              <CardDescription>Your recorded income entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomeLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {format(log.startDate, 'MMM dd')} - {format(log.endDate, 'MMM dd, yyyy')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Logged on {format(log.createdAt, 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{log.income.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        {Math.ceil((log.endDate.getTime() - log.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LogIncome 