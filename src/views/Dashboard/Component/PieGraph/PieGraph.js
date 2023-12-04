import './pie-graph.css'
import './mobile-pie-graph.css'
import { listOfColor as listOfColors } from '../listColor'
import { useEffect, useState } from 'react';

const theData = [
    {
        id: 'siswa',
        name: 'Siswa',
        total: 350
    },
    {
        id: 'alumni',
        name: 'Alumni',
        total: 642
    },
    {
        id: 'guru',
        name: 'Guru',
        total: 127
    },
    {
        id: 'staff',
        name: 'Staff',
        total: 331
    },
]

const listOfColor = []

const randColor = () => {
    for (let i = 0; i < theData.length;i++) {
        const num = [Math.floor(Math.random() * 6)]
        let check = listOfColor.filter(item => item === num[0])[0]
        if (check !== undefined)
            while (check !== undefined) {
                num.pop()
                num.push(Math.floor(Math.random() * 6))     
                check = listOfColor.filter(item => item === num[0])[0]
            }
        
        listOfColor.push(num[0]);
    }
}

randColor()
console.log(listOfColor);

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
                iterateSlices(size, offset, i, 0, listOfColors[listOfColor[i]]);
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
                        <div key={index} className='dashboard--pie--data--column'>
                            <div className='dashboard--pie--data--color' style={{ background: listOfColors[listOfColor[index]] }}></div>
                            <span>{item.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PieGraph