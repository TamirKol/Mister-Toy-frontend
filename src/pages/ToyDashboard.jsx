import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions.js'
import { chartService } from '../services/chart.service.js';
import { AvgPricePerLabel } from '../cmps/charts/AvgPricePerLabel.jsx';
import { InStockPrecentPerLabel } from '../cmps/charts/InStockPrecentPerLabel.jsx';
import { utilService } from '../services/util.service.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,   RadialLinearScale} from 'chart.js';
import { Doughnut, PolarArea } from 'react-chartjs-2';
import { SalesPerMonth } from '../cmps/charts/SalesPerMonth.jsx';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);



export function ToyDashboard() {
const toys = useSelector(storeState => storeState.toyModule.toys)

useEffect(()=>{
loadToys()
},[])
const averagePricePerLabel= chartService.getAveragePricePerLabel(toys)
const inStockPrecentByLabel= chartService.getInStockPercentByLabel(toys)
const getRandomIntInclusive = utilService.getRandomIntInclusive(0,1000)


    return (
        <section style={{maxWidth:'60vw', margin:'auto'}}>
            <div>
                <h3>Store Analytics</h3>

            </div>
          <AvgPricePerLabel toys={toys} avgPricePerLabel={averagePricePerLabel}/>
      
          <InStockPrecentPerLabel toys={toys} inStockPercentByLabel={inStockPrecentByLabel}/>
          <SalesPerMonth getRandomIntInclusive={getRandomIntInclusive}/>
          
          </section>
    )
}
