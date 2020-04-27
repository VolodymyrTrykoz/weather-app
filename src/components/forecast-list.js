import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';


const Chart = ({graphData, color, units}) => (
    <>
        <Sparklines data={graphData.data} width={100} height={30}>
            <SparklinesLine style={{ stroke: color, strokeWidth: "1", fill: "#5ca955" }} />
            <SparklinesReferenceLine type="mean" />
        </Sparklines>
        <div>{graphData.medium} {units}</div>
    </>
)

class ForecastList extends Component {

    render(){
        const {isLoading} = this.props;

        if(isLoading){
            return(
                <div>Loading... </div>
            )
        }

        const {cities} = this.props;

        const graphData = (list, figure) => {
            const sortedList = list.map(el => el.main).slice(0, 10).reduce((acc, el) => [...acc, el[figure]], [])
            
            const total = sortedList.reduce((acc, c) => acc + c, 0);
            return {
                data: sortedList,
                medium: Math.round(total / sortedList.length - 273.1)
            }
        }
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (C)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cities.map(({city, list}) => (
                            <tr key={city.id}>
                                <td>
                                    {city.name}  
                                </td>
                                <td>
                                    <Chart 
                                       graphData={graphData(list, 'temp')}
                                       color='#45bb46'
                                       units='C'  
                                    />
                                </td>
                                <td>
                                    <Chart 
                                       graphData={graphData(list, 'pressure')}
                                       color='#99d6fd' 
                                       units='hPa'   
                                    />
                                </td>
                                <td>
                                    <Chart 
                                       graphData={graphData(list, 'humidity')}
                                       color='#7360ec'  
                                       units='%'  
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = ({fetchReducers}) => {
    return {
        isLoading: fetchReducers.loading,
        cities: fetchReducers.cities
    }
}

export default connect(mapStateToProps)(ForecastList);


