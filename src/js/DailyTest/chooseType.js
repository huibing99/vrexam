import React from 'react';
import {useNavigate} from "react-router-dom";
import { Col, Row ,Button} from 'antd';
import myAxios from '../../service/myAxios';
import '../../css/chooseType.css';

const ChooseType = () =>{

    const navigate = useNavigate();

    const onDailyTest = () =>{
        navigate('/dailyTest')
    }

    const onExam = () =>{ 
        // myAxios.get('111.33.172.61:9090/answer-sheet/getScoreByUser?username='+localStorage.getItem("username"))
        myAxios.get('api/answer-sheet/getScoreByUser?username='+localStorage.getItem("username"))
        .then((response)=>{
           if(response === -1){
             navigate('/test');
           }
           else{
             navigate('/info');
           }
       });
    }

    return(
        <div class="button-container">
            <button class="button" onClick={onDailyTest}>日常练习</button>
            <button class="button" onClick={onExam}>统一考试</button>
      </div>
    );
}

export default ChooseType;