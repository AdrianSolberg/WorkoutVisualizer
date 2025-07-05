import './App.css'
import { StatCards } from './components/StatCards'

function App() {

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <StatCards />
        </div>
      </div>
    </div>
  )
}

export default App
