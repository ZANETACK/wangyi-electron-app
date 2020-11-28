export function formatObjToParams(obj) {
    let arr = [];
    for(let key in obj){
        arr.push(`${key}=${obj[key]}`)
    }
    return arr.join('&')
}
export function formatSecond(second) {
    let secondType = typeof second;
    let time = '00:00';
    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second);
        
        let hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        let mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        
        time = ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
        time = '00:00'
    }
   return time
}
// 补零
export function zeroize(n) {
    return n < 10 ? '0' + n : n + ''
}

export function formatDate(value, isTime, bool){
    let set  = zeroize;
    let date = new Date(value);
    let d = [date.getFullYear(), set(date.getMonth() + 1),  set(date.getDate())].join('-');
    if(bool){
        return {
            Y: date.getFullYear(),
            M: set(date.getMonth() + 1),
            D: set(date.getDate()),
            h: set(date.getHours()),
            m: set(date.getMinutes()),
            s: set(date.getSeconds())
        }
    }
    return !isTime ? d : d  + ' ' + [set(date.getHours()), set(date.getMinutes()), set(date.getSeconds())].join(':')
}

export function setCookie(c_name,value,expire) {
    let date = new Date();
    date.setSeconds(date.getSeconds()+expire)
    document.cookie=c_name+ "="+escape(value)+"; expires="+date.toGMTString()
}

export function delCookie(c_name){
    setCookie(c_name, "", -1)
}

export function setStorage(key, value){
    window.localStorage.setItem(key, value)
}


export function getStorage(key){
    window.localStorage.getItem(key)
}

export function removeStorage(key){
    window.localStorage.removeItem(key)
}
