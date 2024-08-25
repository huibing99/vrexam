import { message } from "antd";
import axios from "axios";

class myAxios{

    constructor(){
        axios.defaults.withCredentials = true;
        this.myAxios = axios;
    }

    
   

    judge(data,resolve){
        if(data.code === 502){
            window.location.reload();
        }
        if((data.code === 1002) || (data.code === 2002) || (data.code === 2003) || (data.code ===4002) || (data.code === 3002) || (data.code === 6002)){
            message.error(data.message)
        }
        else{
            resolve(data)
        }
    }

    post(url,body,params){

        axios.defaults.headers.common['token'] = localStorage.getItem("loginToken");
        axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

        return new Promise((resolve,reject) =>{
            this.myAxios({
                url:url,
                method:'post',
                data:body,
            })
            .then((res)=>{
                if(res.status === 200){
                    const data = res.data
                    this.judge(data,resolve)
                }else{
                    reject(new Error("状态值不是200"))
                }
            })
            .catch(res=>{
                console.log(res)
            })
        }).catch(e=>{})
    }

    get(url,params){
        if(params === undefined){
            params = ''
        }
        return new Promise((resolve,reject)=>{
            
            axios.defaults.headers.common['token'] = localStorage.getItem("loginToken");
            
            this.myAxios({
                url:url,
                method:'get',
                params:params,
                
            })
            .then((res)=>{
                if(res.status === 200){
                    const data = res.data;
                    this.judge(data,resolve);
                    
                }else{
                    reject(new Error("状态值不是200"))
                }
            })
            .catch(res=>{
                console.log(res)
            })
        }).catch(e=>{})
    }

    delete(url,params){
        return new Promise((resolve,reject)=>{
            this.myAxios({
                url:url,
                method:'delete',
                params:params,
            })
            .then(res=>{
                if(res.status === 200){
                    const data = res.data
                    this.judge(data,resolve)
                }else{
                    reject(new Error("状态值不是200"))
                }
            })
            .catch(res=>{
                console.log(res)
            })
        }).catch(e=>{})
    }

    download(url,data,fileType){
        const res = axios.request({
            url:url,
            method:'post',
            data:data,
            responseType:"blob"
        })
        .then((res)=>{
            const data = res.data;
            let url = window.URL.createObjectURL(data);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = fileType;
            a.click();
            window.URL.revokeObjectURL(url);
        }); 
    }
}

export default new myAxios();