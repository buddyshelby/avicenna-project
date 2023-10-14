import { useWindowSize, ResponsiveComponent} from '../../Function/SeparateFunction'
import React from 'react'

const DashboardBox = () => {

    // eslint-disable-next-line
    const [width, height] = useWindowSize()

    // eslint-disable-next-line
    const statusStyle = (status) => {
        if (status.toUpperCase() === "MASUK") {
            return {
                color: `#6EE7B7`,
                backgroundColor: `#065F46`,
                fontSize: `${ResponsiveComponent(1080, 14, 600, 7, width)}px`
            }
        } else if (status.toUpperCase() === "ABSEN") {
            return {
                color: `#FCA5A5`,
                backgroundColor: `#991B1B`,
                fontSize: `${ResponsiveComponent(1080, 14, 600, 7, width)}px`
            }
        }
    }

    return (
        <React.Fragment>
        <table border="1">
            <tr>
                <td>aaa</td>
                <td>aaa</td>
            </tr>
        </table>
        </React.Fragment>
    )

}

export default DashboardBox