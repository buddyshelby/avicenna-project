// eslint-disable-next-line
import { useLayoutEffect, useState } from "react"
// import loginStyles from '../views/Login/login.module.css'

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateWindowSize() {
        setWindowSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();
        return () => window.removeEventListener('resize', updateWindowSize);
    }, []);
    return windowSize;
}

const SeperateFunction = (props) => {
    return (
        <></>
    )
}

export default SeperateFunction

export const ResponsiveComponent = (biggestWindow, biggestSize, smallestWindow, smallestSize, currentWindow) => {

    if (currentWindow < biggestWindow) {
        const percent = (currentWindow - smallestWindow) / (biggestWindow - smallestWindow);
    
        // Menghitung ukuran responsif berdasarkan persentase
        const currentSize = smallestSize + percent * (biggestSize - smallestSize);
        
        return currentSize;
    } else {
        return biggestSize;
    }
}

export const convertDate = (modDate, timezone) => {

    const options = {
        timeZone: timezone, // Set the timezone to Asia/Jakarta (WIB)
    };

    const date = new Date(modDate.toLocaleString('en-US', options))
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// export const handlePostRequest1 = async (postData) => {
//     if (typeof postData !== 'object') {
//         return 'Please input parameter Data correctly.'
//     }

//     try {
//         const response = await fetch(postData.apiUrl, {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json', // Specify that you're sending JSON data
//             },
//             body: JSON.stringify(postData), // Convert the data to JSON format
//         });
        
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
        
//         const jsonData = await response.json(); // Parse the JSON response from the server
//         console.log(jsonData);
        
//     } catch (error) {
//         console.error('There was a problem with the POST request:', error);
//     }

// }