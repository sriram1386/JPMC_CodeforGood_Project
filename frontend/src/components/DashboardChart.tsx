import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const villageData = [
  { name: 'Jan', villages: 12, farmers: 240 },
  { name: 'Feb', villages: 19, farmers: 380 },
  { name: 'Mar', villages: 15, farmers: 300 },
  { name: 'Apr', villages: 25, farmers: 500 },
  { name: 'May', villages: 22, farmers: 440 },
  { name: 'Jun', villages: 30, farmers: 600 },
]

const cropData = [
  { name: 'Rice', value: 40, color: '#22c55e' },
  { name: 'Maize', value: 25, color: '#fbbf24' },
  { name: 'Wheat', value: 20, color: '#fb923c' },
  { name: 'Others', value: 15, color: '#ea580c' },
]

export function DashboardChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Village & Farmer Growth</CardTitle>
          <CardDescription>Monthly registration trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={villageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="villages" fill="#22c55e" name="Villages" />
              <Bar dataKey="farmers" fill="#fb923c" name="Farmers" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Crop Distribution</CardTitle>
          <CardDescription>Primary crops grown by farmers</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-4">
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
    </div>
  )
}
