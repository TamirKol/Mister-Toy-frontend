import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions.js'
import { chartService } from '../services/chart.service.js';
import { AvgPricePerLabel } from '../cmps/charts/AvgPricePerLabel.jsx';
import { InStockPrecentPerLabel } from '../cmps/charts/InStockPrecentPerLabel.jsx';
import { utilService } from '../services/util.service.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea } from 'react-chartjs-2';
import { SalesPerMonth } from '../cmps/charts/SalesPerMonth.jsx';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);



export function ToyDashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])
    const averagePricePerLabel = chartService.getAveragePricePerLabel(toys)
    const inStockPrecentByLabel = chartService.getInStockPercentByLabel(toys)
    const getRandomIntInclusive = utilService.getRandomIntInclusive(0, 1000)


    return (
        <section className='dashboard' style={{ maxWidth: '60vw', margin: 'auto' }}>
            <div>
                <h3 className='text-center'>Store Analytics</h3>

            </div>
            <div className="grid-container">
                <div className="div1 chart-card">
                    <InStockPrecentPerLabel toys={toys} inStockPercentByLabel={inStockPrecentByLabel} />
                </div>

                <div className="div2 chart-card"> <h4>Amount in Stock:</h4>
                    <table className='text-center'>
                        <tr>
                        <th>Toy Name</th>
                        <th>Amount</th>
                        </tr>
                       {toys.map((toy)=>{
                        return( <tr>
                            <td>{toy.name}</td>
                            <td>{utilService.getRandomIntInclusive(1,500)}</td>
                        </tr>)
                       })}
                 </table>
                 </div>

                <div className="div3 chart-card">
                <SalesPerMonth getRandomIntInclusive={getRandomIntInclusive} />
                </div>

                <div className="div4 chart-card ">  <AvgPricePerLabel toys={toys} avgPricePerLabel={averagePricePerLabel} /> </div>
                <div className="div5 chart-card flex flex-column align-center justify-between">
                    <div className=' kpi-card'>
                        <h3>Gross Margin profit</h3>
                        <h2>92%</h2>
                    </div>                
                    <div className=' kpi-card'>
                        <h3>Amount of New Customers</h3>
                        <h2>{utilService.getRandomIntInclusive(10,300)}</h2>
                    </div>
                    <div className=' kpi-card'>
                        <h3>Average Order Value</h3>
                        <h2>${utilService.getRandomIntInclusive(50,300)}</h2>
                    </div>
                    <div className=' kpi-card'>
                        <h3>Website Traffic per month</h3>
                        <h2>{utilService.getRandomIntInclusive(100,500)}</h2>
                    </div>

                     </div>
            </div>







          


        </section >
    )
}
