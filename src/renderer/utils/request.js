import axios from 'axios';
import qs from 'qs';
const config = require('../../../.electron-vue/config.js');
const baseURL = `${config.APP_URL_API}:${config.SERVER_PORT}${config.APP_BASE_API}`;

function createDefaultRequest() {
    const instance = axios.create({
        baseURL,
        timeout: 1000*60,
    });
    instance.interceptors.request.use(config=>{
        config.data = qs.stringify(config.data)
        return config;
    });
    instance.interceptors.response.use(response=>{
        const data = response.data;
        if(data && data.code != 200){
            const error = {
                code:data.code,
                message:data.msg,
                response,
                type:'RequestError'
            };
            return Promise.reject(error);
        }
        return data;
    },(r)=>{
        if(r instanceof Error){
            return Promise.reject({
                code:r.code,
                message:r.message,
                type:'RequestError'
            });
        }
        const response = r.response;
        const status = response.status;
        const error = {
            message:`[${status}]${response.statusText}`,
            code:status,
            response,
            type:'RequestError'
        };
        return Promise.reject(error);
    });
    return instance;
}

export default createDefaultRequest();
