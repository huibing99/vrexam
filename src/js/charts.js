import React, { useState,useEffect} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import myAxios from '../service/myAxios';

const Charts = (props) =>{
  const [chartsdata,setChartsData] = useState([]);
  

  useEffect(()=>{
    async function getCharts() {
      

      console.log(props.data)
      if(typeof(props.data) === "undefined"){
        // const response = await myAxios.get('111.33.172.61:9090/answer-sheet/getChartByUser?username='+localStorage.getItem("username"));
        const response = await myAxios.get('api/answer-sheet/getChartByUser?username='+localStorage.getItem("username"));
        setChartsData(response.data);

      }
      else{
        setChartsData(props.data);
      }
                  
      }
    
      getCharts();

  },[]);


  return(
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ResponsiveContainer width="80%" height={500}>
        <BarChart
          width="500px"
          height="300px"
          data={chartsdata}
          
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
      {console.log('Charts获取的data:',chartsdata)}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="correct" fill="#3CB371" />
          <Bar dataKey="uncorrect" fill="#EE2C2C" />
        </BarChart>

      </ResponsiveContainer>

    </div>
    
  );

}

export default Charts;

