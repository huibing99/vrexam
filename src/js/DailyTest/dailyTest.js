import React, { useState, useEffect} from 'react';
import { Col, Row ,Button} from 'antd';
import 'antd/dist/antd.min.css';
import myAxios from '../../service/myAxios.js';
import {useNavigate} from "react-router-dom";
import QuestionBar from '../TestType.js';


const DailyTest = () =>{

    const [questions,setQuestions] = useState([]);
    const [answers,setAnswers] = useState({});
    const [questionsOrder,setQuestionsOrder] = useState([]);

    const navigate = useNavigate();

    let questions_now = [];  //记录试卷
    let answers_now = {};    //记录用户答案
    let questions_order = [];  //记录试题顺序


    useEffect(() =>{
      
        async function fetchData() {
          // const getQuestions = await myAxios.get('111.33.172.61:9090//question/getRandomTestPaper')
          const getQuestions = await myAxios.get('api/question/getRandomTestPaper')
                                            .then((response)=>{
                                                console.log("response",response);  
                                                
                                                response.forEach((question,index)=>
                                                {
                                                    questions_now.push(<div className='effect1'><div className="effect2" key={index}><QuestionBar question={question} index={index} getChildrenAnswer={getChildrenAnswer}/></div></div>)
                                                    questions_order.push(question.id);
                                                })
                                                
                                                setQuestions(questions_now);
                                                setQuestionsOrder(questions_order);
  
                                            });  //获取试卷
        }
  
        fetchData();
  
      },[]);

    const getChildrenAnswer = (testID,answer) =>{
        answers_now[testID] = answer;
        setAnswers(answers_now);
    }

    const onSubmit = ()=>{

        // myAxios.post('111.33.172.61:9090/answer-sheet/dailyTest',{
        myAxios.post('api/answer-sheet/dailyTest',{
          username:localStorage.getItem("username"),
          questionOrder:questionsOrder,
          question2Answer:answers
        })
              .then((response)=>{
                if(response.code === '200'){
                  navigate('/dailyScore',{state:{data:response.data}});
                }
                else{
                  alert("提交失败！");
                }
              })
      }

    return(
      <Row>

        <Col span={0.5}/>
        <Col span={23}>
          {questions}
          {console.log(questions)}
        </Col>
        <Col span={0.5}/>

        <Col span={0.5}/>
        <Col span={23}>
          <div className="effect1">
            <div className='effect2'>
              <Button onClick={onSubmit} size="large" type="primary">提交答卷</Button>
            </div>
          </div>
        </Col>
        <Col span={0.5}/>
      </Row>
    );

}



export default DailyTest;