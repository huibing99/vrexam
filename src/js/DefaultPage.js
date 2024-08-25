import {Layout, Menu } from 'antd';
import 'antd/dist/antd.min.css';
import React from 'react';
import Login from './Login.js';
import '../css/DefaultPage.css';
import { Routes, Route, useNavigate} from "react-router-dom";
import TestPage from './TestPage';
import SuccessPage from './SuccessPage.js';
import InfoPage from './InfoPage.js';
import LawPage from './LawPage.js';
import WritPage1 from './WritPage1';
import WritPage2 from './WritPage2';
import myAxios from '../service/myAxios';
import ScorePage from './ScorePage.js';
import ShowLaw from './ShowLaw.js';
import EmptyPage from './Empty.js';
import ChooseType from './DailyTest/chooseType.js';
import DailyTest from './DailyTest/dailyTest.js';
import DailyScore from './DailyTest/dailyScore.js';


const { Content, Sider } = Layout;



const DefaultPage = () => {


  const navigate = useNavigate();
  
  
  const onSelect = (selectedKeys) =>{
      if(selectedKeys.key === "1"){
        // if(localStorage.getItem("username") === null){
          navigate('/');
        // }
      //   else{
      //     // myAxios.get('111.33.172.61:9090/answer-sheet/getScoreByUser?username='+localStorage.getItem("username"))
      //     myAxios.get('api/answer-sheet/getScoreByUser?username='+localStorage.getItem("username"))
      //     .then((response)=>{
      //      if(response === -1){
      //        navigate('/');
      //      }
      //      else{
      //        navigate('/info');
      //      }
      //  });
      //   }
       
      }
      else if(selectedKeys.key === "2"){
      navigate('/law');
      }
      else if(selectedKeys.key === "3"){
      navigate('/writ1');
      }
      else if(selectedKeys.key === "4"){
      navigate('/writ2');
      }
  }

  function getItem(label, key, children) {
    return {
      key,
      children,
      label,
    };
  }

  const items = [
    getItem('考核', '1'),
    getItem('法律法规', '2'),
    getItem('执法文书', 'sub1',  [
      getItem('目录', '3'),
      getItem('实用指南', '4'),
    ])
  ];


return(
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        onSelect={onSelect}
      />
    </Sider>

    <Layout>

      <Content
        style={{
          // margin: '24px 16px 0',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            minHeight: 360,
            backgroundColor:"white",
            height:"100%",
            width:"100%",
            display:"block",
            backgroundSize:"cover",
            position:"absolute",
            overflowY:"scroll"
          }}
        >
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/test' element={<div className='TestModule'><TestPage/></div>}></Route>
            <Route path='/success' element={<SuccessPage/>}></Route>
            <Route path='/info' element={<InfoPage/>}></Route>
            <Route path='/law' element={<LawPage/>}></Route>
            <Route path='/writ1' element={<WritPage1/>}></Route>
            <Route path='/writ2' element={<WritPage2/>}></Route>
            <Route path='/score' element={<ScorePage/>}></Route>
            <Route path='/wait' element={<EmptyPage/>}></Route>
            <Route path='/showLaw' element={<ShowLaw/>}></Route>
            <Route path='/chooseType' element={<ChooseType/>}></Route>
            <Route path='/dailyTest' element={<DailyTest/>}></Route>
            <Route path='dailyScore' element={<DailyScore/>}></Route>
          </Routes>
        </div>
      </Content>


    </Layout>
  </Layout>

);
};

export default DefaultPage;


