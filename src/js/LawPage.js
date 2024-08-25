import React ,{ useState }from 'react';
import { Input,List} from 'antd';
import 'antd/dist/antd.min.css';
import '../css/LawPage.css';
import myAxios from '../service/myAxios';
import { useNavigate} from "react-router-dom";


const { Search } = Input;

const count = 3;


const LawPage = () =>{
    const [query,setQuery] = useState();
    const [responseContent,setResponseContent] = useState([]);

    const startReg = RegExp("\\<strong>", "g");
    const endReg = RegExp("\\</strong>", "g");


    const navigate = useNavigate();

    const onChange =(e)=>{
        setQuery(e.target.value);
    }


    const onSearch =()=>{
        
        myAxios.post('elasticsearch/index3/_search',
                                    {_source:["filename","attachment.content"],
                                     query:{ 
                                              "multi_match": 
                                                 { "query": query,
                                                   "fields": ["filename^20", "attachment.content"],
                                                   "analyzer":"smartcn", 
                                                   "fuzziness":"auto"
                                                }
                                            },
                                     highlight:{
                                                 "number_of_fragments" : 1,
                                                 "fragment_size" : 150, 
                                                 "fields" : 
                                                    {
                                                        "attachment.content" : 
                                                        { 
                                                            "pre_tags" : ["<strong>"], 
                                                            "post_tags" : ["</strong>"] 
                                                        }
                                                    }
                                                }
                                    }
                                    )
               .then((response)=>{
                
                    setResponseContent(response.hits.hits);

               })
    }



    const getPaper = (filename) =>{
        
        navigate('/showLaw',{state:{filename:filename}});
        
    }

    return(
    <div className='show-search'>
         <div className='search-box'>
            <Search  className='search' placeholder="请输入关键字！" onSearch={onSearch} onChange={onChange} enterButton size='large'/>
        </div>

        <div className='show-search-content'>

            <List
                itemLayout="horizontal"
                locale={{ emptyText: '暂无数据' }}
                dataSource={responseContent}
                renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                    title={<a onClick={()=>getPaper(item._source.filename)}>{item._source.filename}</a>}
                    description={
                                    <p className='search-content' 
                                       dangerouslySetInnerHTML={
                                                                { __html: item.highlight['attachment.content'][0].replace(startReg,'<span style="font-weight: bold; background-color: yellow;">')
                                                                                                                 .replace(endReg,'</span>') }}>
                                    </p>}
                    
                    />
                </List.Item>
                )}
            />

        </div>

    </div>
       
        
        

            
        
    )
   
};

export default LawPage;
