import React, { useState, useEffect} from 'react';
import {Radio,Space,Input,Checkbox} from 'antd';
import 'antd/dist/antd.min.css';

const SingleChoice = (props) => {
    const [choice, setChoice] = useState("");
    const [optionList,setOptionList] = useState([]);

    const options = ["op1","op2","op3","op4","op5","op6"];
    const values_list = ["A","B","C","D","E","F"];

    let option_list = [];

    useEffect(()=>{
      
      checkOption();
      
    },[]);
  
    const onChange = (e) => {
      setChoice(e.target.value);
      props.getChildrenAnswer(props.responseUse.id,e.target.value);
    };

    const checkOption = () =>{
      
      options.forEach((option,index)=>{
        if(props.responseUse[option] != null){
          option_list.push(<Radio value={values_list[index]}>{values_list[index]}.  {props.responseUse[option]}</Radio>)
        }
        
        setOptionList(option_list);
      })
      
    }
  
    return (
      <div className='SingleChoiceBody'>
        <div className='SingleChoiceBorder'>
          <div className='SingleChoiceTitle'>
            <p className='question_title'>
            {props.index+1}. {props.responseUse.question}
            </p>
          </div>
          <div className='SingleChoiceContent'>
            <Radio.Group onChange={onChange} defaultValue={props.defaultValue} size="large">
             <Space direction = "vertical" style={{display:'block'}}>

               {options.map((option,index)=>{
                if(props.responseUse[option] != null){
                  return(<Radio value={values_list[index]}>
                          <p className='question_content'>
                            {values_list[index]}.  {props.responseUse[option]}
                          </p>     
                        </Radio>)
                }
               })}
               
             </Space>
           </Radio.Group>
          </div>
        </div>
      </div>
      
    );
  };
  
  
  const MultiChoice = (props)=>{
    const [choiceList,setChoiceList] = useState("");
    const [optionList,setOptionList] = useState([]);

    let option_list = [];
    const options = ["op1","op2","op3","op4","op5","op6"];
    const values_list = ["A","B","C","D","E","F"];

    useEffect(()=>{

      checkOption();
      
    },[]);
  
    const onChange = (checkedValue) => {
      var final_choice = ((checkedValue.sort()).toString()).replace(/,/g,"");
      setChoiceList(final_choice);
      props.getChildrenAnswer(props.responseUse.id,final_choice);
    };

    const checkOption = () =>{
      
      options.forEach((option,index)=>{
        if(props.responseUse[option] != null){
          option_list.push(<Checkbox value={values_list[index]}>{values_list[index]}.  {props.responseUse[option]}</Checkbox>)
        }
        
        setOptionList(option_list);
      })
      
    }
  
    return(
      <div className='MultiChoiceBody'>
        <div className='MultiChoiceBorder'>
          <div className='MultiChoiceTitle'>
            <p className='question_title'>
            {props.index+1}. {props.responseUse.question} 
            </p>
          </div>
          <div className='MultiChoiceContent'>
            <Checkbox.Group style={{width: '100%',}} onChange={onChange} defaultValue={props.defaultValue}>
              <Space direction = "vertical" style={{display:'block'}}>

                {/* {optionList} */}
                {options.map((option,index)=>{
                  if(props.responseUse[option] != null){
                    return(<Checkbox value={values_list[index]}>
                              <p className='question_content'>
                              {values_list[index]}.  {props.responseUse[option]}

                              </p>
                           </Checkbox>)
                  }
                })}

              </Space>
            </Checkbox.Group>
          </div>
        </div>
      </div>
      
    );
  
  }
  
  const TrueOrFalse = (props) =>{
    const [choice,setChoice] = useState('');
  
    const onChange = (e) =>{
      setChoice(e.target.value);
      props.getChildrenAnswer(props.responseUse.id,e.target.value);
    };
  
    return(
      <div className='TrueOrFalseBody'>
        <div className='TrueOrFalseBorder'>
          <div className='TrueOrFalseTitle'>
            <p className='question_title'>
            {props.index+1}. {props.responseUse.question}
             </p>
          </div>
  
          <div className='TrueOrFalseContent'>
            <Radio.Group onChange={onChange} defaultValue={props.defaultValue}>
              <Space direction='vertical' style={{display:'block'}}>
                <Radio value={"正确"}>
                  <p className='question_content'>正确</p>
                </Radio>
                <Radio value={"错误"}>
                  <p className='question_content'>错误</p>
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
  
      </div>
    );
  };
  
  const QAndA = (props) =>{
    const [answer,setAnswer] = useState('');
  
    const onChange = (e) =>{
      setAnswer(e.target.value);
      props.getChildrenAnswer(props.responseUse.id,e.target.value);
    };
  
    return(
      <div className='QAndABody'>
  
        <div className='QAndABorder'>
          <div className='QAndATitle'>
            <p className='question_title'>
            {props.index+1}. {props.responseUse.question}
            </p>
          </div>
          <div className='QAndAContent'>
            <Input showCount maxLength={200} style={{height:120}} onChange={onChange}/>
          </div>
        </div>

      </div>
      
    );
  };
  
  const Completion = (props) =>{
    const [answer,setAnswer] = useState('');
    const onChange = (e) =>{
      setAnswer(e.target.value);
      props.getChildrenAnswer(props.responseUse.id,e.target.value);
    };
    
    return(
      <div className='CompletionBody'>
        <div className='CompletionBorder'>
  
          <div className='CompletionTitle'>
            <p className='question_title'>
            {props.index+1}. {props.responseUse.question}
            </p>
          </div>
  
          <div className='CompletionContent'>
            <Input.Group compact>
              <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="" value={onChange}/>
            </Input.Group>
           </div>
        </div>
        
      </div>
    );
  }

  const QuestionBar = (props) =>{

    switch(props.question.type){
        case '单选':
          return <SingleChoice responseUse={props.question} index={props.index} getChildrenAnswer={props.getChildrenAnswer} defaultValue={props.defaultValue}></SingleChoice>;
        case '多选':
          return <MultiChoice responseUse={props.question} index={props.index} getChildrenAnswer={props.getChildrenAnswer} defaultValue={props.defaultValue}></MultiChoice>;
        case '判断':
          return <TrueOrFalse responseUse={props.question} index={props.index} getChildrenAnswer={props.getChildrenAnswer} defaultValue={props.defaultValue}></TrueOrFalse>;
        case '简答':
          return <QAndA responseUse={props.question} index={props.index} getChildrenAnswer={props.getChildrenAnswer} defaultValue={props.defaultValue}></QAndA>;
        case '填空':
          return <Completion responseUse={props.question} index={props.index} getChildrenAnswer={props.getChildrenAnswer} defaultValue={props.defaultValue}></Completion>;
        default:
          return '类型错误！';
      }
  }

  export default QuestionBar;