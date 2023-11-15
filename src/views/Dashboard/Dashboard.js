import './dashboard.css'
import PieGraph from './Component/PieGraph/PieGraph'
import TopSummary from './Component/TopSummary/TopSummary'

const Dashboard = () => {

    return (
        <div id='dashboard' style={{ margin: '0 0 0 20px' }}>
            <TopSummary />
            <PieGraph />
        </div>
    )
}

export default Dashboard;