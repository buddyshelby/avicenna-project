import './pie-graph.css'
import { listOfColor } from '../listColor'
import { useEffect, useState } from 'react';

const theData = [
    {
        id: 'admin',
        name: 'Admin',
        total: 900
    },
    {
        id: 'staff',
        name: 'Staff',
        total: 1000
    },
    {
        id: 'guru',
        name: 'Guru',
        total: 700
    },
]

const PieGraph = () => {

    const [pieElements, setPieElements] = useState([]);
    const [triggerOnce, setTriggerOnce] = useState(false)

    useEffect(() => {
        if (triggerOnce) {
            const sliceSize = (dataNum, dataTotal) => (dataNum / dataTotal) * 360;
            let idKey = 0
    
            const addSlice = (sliceSize, offset, sliceID, color) => {
                
                setPieElements(prevPieElements => [
                ...prevPieElements,
                (
                    <div key={sliceID} className={`slice ${sliceID}`} style={{ transform: `rotate(${offset}deg) translate3d(0,0,0)` }}>
                    <span style={{ transform: `rotate(${-179 + sliceSize}deg) translate3d(0,0,0)`, backgroundColor: color }}></span>
                    </div>
                )
                ]);
            };
    
            const iterateSlices = (sliceSize, offset, dataCount, sliceCount, color) => {
                const sliceID = `s${dataCount}-${sliceCount}`;
                const maxSize = 179;
    
                if (sliceSize <= maxSize) {
                addSlice(sliceSize, offset, sliceID, color);
                } else {
                addSlice(maxSize, offset, sliceID, color);
                iterateSlices(sliceSize - maxSize, offset + maxSize, dataCount, sliceCount + 1, color);
                }
            };
    
            const createPie = () => {
                const listTotal = theData.reduce((acc, value) => acc + value.total, 0);
    
                let offset = 0;
    
                theData.forEach((value, i) => {
                const size = sliceSize(value.total, listTotal);
                iterateSlices(size, offset, i, 0, listOfColor[i]);
                offset += size;
                });
            };
    
            createPie();
        }
        setTriggerOnce(true)
    }, [triggerOnce]);

    return (
        <div
        style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
         }}
        >
            <div className="pieID pie">
                <div className='dashboard--pie--wrapper'>  
                    {pieElements}
                </div>
            </div>
            <div className='dashboard--pie--data'>    
                {theData.map((item, index) => {
                    
                    return (
                        <div className='dashboard--pie--data--column'>
                            <div className='dashboard--pie--data--color' style={{ background: listOfColor[index] }}></div>
                            <span>{item.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PieGraph