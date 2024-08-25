import { Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const EmptyPage = () =>{
    const navigate = useNavigate();

    const onClick = ()=>{
        navigate('/');
    }
    return(
        <Result
            icon={<SmileOutlined />}
            title="考试尚未发布！"
            extra={
            <Button type="primary" key="login" onClick={onClick} size='large'>
                返回
            </Button>
        }
      />
    )
} ;
export default EmptyPage;
