import crypto from 'crypto-js';
export default defineNuxtPlugin((nuxtApp) => {
  return {
      provide: {
        encrypt: encrypt,
        decrypt: decrypt,
      },
    };
  });
export function encrypt(data, key, iv) {
    if (typeof data === "object") {
        // 如果傳入的data是json物件，先轉義為json字串
        try {
            data = JSON.stringify(data)
        } catch (error) {
            console.log("error:", error)
        }
    }
    // 統一將傳入的字串轉成UTF8編碼
    // const dataHex = crypto.enc.Utf8.parse(data) // 需要加密的資料
    let utfKey = crypto.enc.Utf8.parse(key);
    let Utfiv =  crypto.enc.Utf8.parse(iv);
    let option = {
        iv: Utfiv,
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
    }
    let ciphertext ;
    try{
      ciphertext = crypto.AES.encrypt(data,utfKey,option).toString();
    }catch(error){
      console.log('error',error);
    }
    return ciphertext ;//  返回加密後的值
}

// 解密資料
export function decrypt(encryptedVal, key, iv) {
    /*
      傳入的key和iv需要和加密時候傳入的key一致  
    */
    // 統一將傳入的字串轉成UTF8編碼
    // encryptedVal = encryptedVal.toString().replace(/\s*/g, "");
    // console.log("encryptedVal",encryptedVal);
    
    let decryptedStr = "";
    try {
        const keyHex = crypto.enc.Utf8.parse(key) // 祕鑰
        const ivHex = crypto.enc.Utf8.parse(iv) // 偏移量
        let decrypt = crypto.AES.decrypt(encryptedVal, keyHex, {
            iv: ivHex,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        });
        decryptedStr = decrypt.toString(crypto.enc.Utf8);
    } catch (error) {
        console.log("解密失敗 :" + error);
    }
    return decryptedStr.toString();
}

