import { ChartLine } from './components/ChartLine'
import { SiteHeader } from './components/SiteHeader'
import { StatCards } from './components/StatCards'
import { Card } from './shadcn/ui/card'
import workoutLog from "../../json_log_output/workouts.json" 
import { useState } from 'react'

function App() {
  const [timeRange, setTimeRange] = useState<string>("all_time")
  
  const filteredData = workoutLog.filter((item: any) => {
    if (timeRange === "all_time") { 
      return true
    }
    
    const workout_date = new Date(item.date)
    let daysToSubtract = 90
    if (timeRange === "year") {
      daysToSubtract = 365
    }

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return workout_date >= startDate
  })

  return (
    <Card className='m-2 py-0 gap-1'>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <StatCards data={filteredData}/>
            <div className="px-4 lg:px-6">
              <ChartLine data={filteredData.filter((w: any) => w.morning_weight !== null)} timeRange={timeRange} setTimeRange={setTimeRange} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default App
