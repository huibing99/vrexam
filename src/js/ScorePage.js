import React, { useState, useEffect} from 'react';
import myAxios from '../service/myAxios';
import {useNavigate,useLocation} from "react-router-dom";
import QuestionBar from './TestType';
import { CheckOutlined,CloseOutlined } from '@ant-design/icons';
import Charts from './charts';
import { Button} from 'antd';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ScorePage = () =>{
    const [score,setScore] = useState();   //记录用户成绩
    const [answerTime,setAnswerTime] = useState(); 
    const [scores,setScores] = useState([]);
    const [showScore,setShowScore] = useState([]);

    const navigate = useNavigate();
  
    let questions_now = [];  //记录试卷

    useEffect(()=>{
        function fetchScore() {
            // myAxios.get('111.33.172.61:9090/answer-sheet/getByUser?username='+localStorage.getItem("username"))
            myAxios.get('api/answer-sheet/getCurrentByUser?username='+localStorage.getItem("username"))
                   .then((res)=>{
                       setScore(res.score);
                       setAnswerTime(res.answertime); 
                  }); 
            
            

            // const get_scores = myAxios.get('111.33.172.61:9090/answer-sheet/getDetailScoreByUser?username='+localStorage.getItem("username"))
            const get_scores = myAxios.get('api/answer-sheet/getDetailScoreByUser?username='+localStorage.getItem("username"))
                                            .then((response)=>{
                                                setScores(response.data);


                                                (response.data).forEach((score,index)=>{
                                                    questions_now.push(<div className='effect1'>
                                                                          <div className="effect2">
                                                                              <QuestionBar question={score.question} index={index} defaultValue={score.answer}/>
                                                                          </div>
                                                                          <div className='showAnswer'>

                                                                              <h2>
                                                                                正确答案为：{score.question.answer}
                                                                                {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}
                                                                                {score.answer === score.question.answer ? <CheckOutlined style={{color:"green"}}/> : <CloseOutlined style={{color:"red"}}/>}
                                                                              </h2>
                                                                              
                                                                          </div>
                                                                          
                                                                      </div>)
                                                   
                                                  })
                                        
                                                  setShowScore(questions_now);

                                                  

                                            });  //获取试卷
          }

          fetchScore();

    },[])

    const onChoose = () =>{
        navigate('/chooseType');
    }
    
    return(
        <div style={{ height: '1000px' }}>
            <div className='effect1'>
                <div className='effect2'>
                    <h1>用户名：{localStorage.getItem("username")}</h1>
                    <h1>作答时间：{answerTime}</h1>
                    <h1>您的成绩为：{score}分</h1>
                </div>
            </div>

            {<Charts/>}
            
            <div>
               {showScore}
            </div>

            <div className="effect1">
                <div className='effect2'>
                <Button onClick={onChoose} size="large" type="primary">返回</Button>
                </div>
            </div>
            
        </div>
        
    );
}

export default ScorePage;