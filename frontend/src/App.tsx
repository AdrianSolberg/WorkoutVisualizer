import './App.css'
import { ChartArea } from './components/ChartArea'
import { StatCards } from './components/StatCards'

function App() {

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <StatCards />
          <div className="px-4 lg:px-6">
            <ChartArea />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
