import { useLocation } from "react-router-dom";

const Index = () => {

    return (
        <div>
            abc
        </div>
    )
}

const Dashboard = () => {

    const { pathname } = useLocation()

    return (
        <div>
            {pathname === '/dashboard' && <Index/>}
        </div>
    )
}

export default Dashboard;