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