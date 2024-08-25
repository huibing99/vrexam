import { Button, Result } from 'antd';
import React from 'react';
import {useNavigate} from "react-router-dom";


const InfoPage = () => {
    const navigate = useNavigate();

    const onClick = () =>{
        navigate('/score');
    }

return(
    <Result
    title="您已提交答案，请勿重复作答！"
    extra={
      <Button type="primary" key="score" onClick={onClick} size="large">
        查看详细得分
      </Button>
    }
  />
  );
};
export default InfoPage;
