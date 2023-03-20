import { encrypt,decrypt } from '~/plugins/crypto';

const key = 'KANGEQIU@8868!~.';
const iv = '0200010900030207';

export const useLazyHttp = async (url, params={},methods='post') => {
    const { data: result, pending, error, refresh } = await useLazyFetch(
      url,
      {
        baseURL:useRuntimeConfig().public.env.BASE_URL,
        params:params,
        method:methods,
        onRequest({ request, options }) {
          console.log('onRequest request:', request);
          // let test = encrypt(options.params,key,iv);
          // console.log('onRequest options.params:', encrypt(options.params,key,iv));
          options.params = encrypt(options.params,key,iv);
          // console.log("加密後 :",options.params);
          // Set the request headers
          // options.headers = options.headers || {}
          // options.headers.authorization = '...'
        },
        onRequestError({ request, options, error }) {
          // console.log('[fetch request error]', request, error);
          // Handle the request errors
        },
        onResponse({ request, response, options }) {
          try{
            response._data.data = JSON.parse(decrypt(response._data.data,key,iv));
          }catch(error){
            console.log(error);
          }
         
        },
        onResponseError({ request, response, options }) {
          // Handle the response errors
          // console.log('[fetch response error]', request, response.status, response.body);
        }    
      }
    )
    let data = result.value;
    return {data,pending};
}