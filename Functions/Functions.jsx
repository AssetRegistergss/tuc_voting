import {FunRequest} from 'funuicss/js/Fun'
export let EndPoint = 'https://asset-register.onrender.com'


export const isOnline = ()=>{
    return new Promise((resolve, reject) => {
        if(sessionStorage.getItem("user")){
            const data =  JSON.parse(sessionStorage.getItem("user"))
            resolve(data)
        }else{
            reject(null)
            window.location.assign("/")
        }
    })
}

export const logOut = ()=>{
    return new Promise((resolve, reject) => {
        function deleteCookie(name) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
          }
          // Example usage: Remove the token cookie on logout
          deleteCookie('authToken');

        sessionStorage.removeItem('user')
        resolve()
    }).then(()=>window.location.assign('/'))
}


export const AddData = (routeName , data)=>{
    return new Promise((resolve, reject) => {
        FunRequest.post(EndPoint + '/api' + routeName , data).then((doc)=>{
            if(doc){
               resolve(doc)
            }else{
                resolve("Successfully submitted")
            }
        })
          .catch(err=>reject(err))
    })
}
export const GetData = (routeName)=>{
    return new Promise((resolve, reject) => {
        FunRequest.get(EndPoint + '/api/' + routeName).then((doc)=>{
            if(doc){
               resolve(doc)
            }else{
                resolve(null)
            }
        })
          .catch(err=>reject(err))
    })
}

export const GetUser = (email)=>{
    return new Promise((resolve, reject) => {
        FunRequest.get(EndPoint + '/api/' + 'users' + "/" + email).then((doc)=>{
            if(doc){
               resolve(doc)
            }else{
                resolve(null)
            }
        })
          .catch(err=>reject(err))
    })
}

export async function SaveToken(token) {
    const reversedString = token.split('').reverse().join('');
    sessionStorage.setItem(
        "token" ,
        JSON.stringify(reversedString)
    )
  }
  
  export function GetToken() {
    if(sessionStorage.getItem("token")){
        let res = JSON.parse(sessionStorage.getItem('token'))
        const decrypt = res.split('').reverse().join('');
        return decrypt
    }
  }