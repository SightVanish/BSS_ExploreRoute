import Googlemap from './components/Map'
import Sidebar from './components/Sidebar'

export default function MapPage() {
  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex-1 h-screen">
        <Googlemap />
      </div>
    </div>
  )
}