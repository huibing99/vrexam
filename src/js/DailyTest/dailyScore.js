import React, { useState, useEffect} from 'react';
import {useNavigate,useLocation} from "react-router-dom";
import QuestionBar from '../TestType';
import { CheckOutlined,CloseOutlined} from '@ant-design/icons';
import { Button} from 'antd';
import Charts from '../charts';

const DailyScore = () =>{
    const [showScore,setShowScore] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
  
    let questions_now = [];  //记录试卷

    useEffect(()=>{
        function fetchScore() {
            // myAxios.get('111.33.172.61:9090/answer-sheet/getDetailScoreByUser?username='+localStorage.getItem("username"))

            (location.state.data.answerDetails).forEach((detail,index)=>{
                questions_now.push(<div className='effect1'>
                                        <div className="effect2">
                                            <QuestionBar question={detail.question} index={index} defaultValue={detail.answer}/>
                                        </div>
                                        <div className='showAnswer'>

                                            <h2>
                                            正确答案为：{detail.question.answer}
                                            {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}
                                            {detail.answer === detail.question.answer ? <CheckOutlined style={{color:"green"}}/> : <CloseOutlined style={{color:"red"}}/>}
                                            </h2>
                                            
                                        </div>
                                        
                                    </div>)
                
                })
    
                setShowScore(questions_now);

                   //获取试卷
          }

          fetchScore();

    },[])

    const onChoose = () =>{
        navigate('/chooseType');
    }
    
    return(
        <div style={{ height: '1000px' }}>    
             {<Charts data={location.state.data.charts}/>}

            {showScore}


            <div className="effect1">
                <div className='effect2'>
                <Button onClick={onChoose} size="large" type="primary">返回</Button>
                </div>
            </div>
        </div>
       
        
    );
}

export default DailyScore;