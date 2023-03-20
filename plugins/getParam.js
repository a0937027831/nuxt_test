export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            getParam:getParam,
        },
    };
});

export function getParam(param){
    const route = useRoute();
    const value = route.params[param];
    if(value == null){
        console.log("value",value);
        console.warn( param + ' not found on this route params for this route are ',JSON.stringify(route.params));
        return null;
    }else{
        return value;
    }
}