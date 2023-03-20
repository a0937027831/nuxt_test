import axios from 'axios';
import { encrypt, decrypt } from "~/plugins/crypto";

const key = 'KANGEQIU@8868!~.';
const iv = '0200010900030207';


const option = {
  timeout: 60000,
  baseURL: 'https://newapi.kanshipinaxsdf.com',
  withCredentials: false,
}

// 此處的axiosInstance為我們create的實體
const axiosInstance = axios.create(option);

export default function (method, url, data = null , config) {
  method = method.toLowerCase();
  const urlSearchData =  new URLSearchParams();
  if(data){
    let jsonData = JSON.stringify(data);
    // console.log("send Json Data");
    // console.dir(jsonData);
    // console.log("send Json Data after");
    let encryptData = encrypt(jsonData,key,iv);
    // console.log("加密後 :"+encryptData);
    urlSearchData.append('parameter', encryptData);
    // console.dir(formData);
  }
 
  switch (method) {
    case "post":
      return axiosInstance.post(url, urlSearchData, config);
    case "get":
      return axiosInstance.get(url);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
}


axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log("request interceptors error :" + error);
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    
    let decryptStr = decrypt(response.data.data,key,iv);
    // console.log("解碼前 Start !!!!!!!!!");
    // console.dir(response.data);
    // console.log("解碼前 response.data.data  Finsh !!!!!!!!!");

    try{
      response.data.data = JSON.parse(decryptStr);
      // console.log("response Json start !!!!!!!!!");
      // console.dir(response.data.data );
      // console.log("response Json end  !!!!!!!!!");
    }catch{
      console.log("response error json");
      response.data.data = {};
    }

    // if(response.data.data != "[]"){
    
    // }else{
    //   response.data.data = [];
    // }
    
    // console.log("解碼後 response.data.data :"+response.data.data);
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.log("你要找的頁面不存在")
          // go to 404 page
          break
        case 500:
          console.log("程式發生問題")
          // go to 500 page
          break
        default:
          console.log(error.message)
      }
    }
    if (!window.navigator.onLine) {
      console.log("網路出了點問題，請重新連線後重整網頁");
      return;
    }
    return Promise.reject(error);
  }
);
