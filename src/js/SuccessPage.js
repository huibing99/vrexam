import { Button, Result } from 'antd';
import React,{ useState,useEffect} from 'react';
import myAxios from '../service/myAxios';
import {useNavigate} from "react-router-dom";

const SuccessPage = () => {

const [score,setScore] = useState();
const navigate = useNavigate();

useEffect(()=>{
    async function getScore() {
      // await myAxios.get('111.33.172.61:9090/answer-sheet/getScoreByUser?username='+localStorage.getItem("username"))
      await myAxios.get('api/answer-sheet/getScoreByUser?username='+localStorage.getItem("username"))
                   .then((response)=>{
                       setScore(response); 
                  }); 
      }
    
      getScore();
    
},[]);

const onClick = () =>{
  navigate('/score');
}

return(
    <Result
    status="success"
    title="提交成功！"
    extra={[
      <div>
        <p style={{fontSize:30}}>您的成绩为：{score}分</p>
        <Button type="primary" key="score" onClick={onClick} size="large">
        查看详细得分
      </Button>
      </div>
    ]}
  />
)
  
};
export default SuccessPage;
