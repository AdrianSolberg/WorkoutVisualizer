import { ChartLine } from './components/ChartLine'
import { SiteHeader } from './components/SiteHeader'
import { StatCards } from './components/StatCards'
import { Card } from './shadcn/ui/card'

function App() {

  return (
    <Card className='m-2 py-0 gap-1'>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <StatCards />
            <div className="px-4 lg:px-6">
              <ChartLine />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default App
