import {FunRequest} from 'funuicss/js/Fun'
export let EndPoint = 'https://asset-register.onrender.com'


export const isOnline = ()=>{
    return new Promise((resolve, reject) => {
        if(localStorage.getItem("user")){
            const data =  JSON.parse(localStorage.getItem("user"))
            resolve(data)
        }else{
            reject(null)
            window.location.assign("/")
        }
    })
}

export const logOut = ()=>{
    return new Promise((resolve, reject) => {
        localStorage.removeItem('user')
        location.reload()
    })
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
        FunRequest.get(EndPoint + '/api/tuc/' + 'users' + "/" + email).then((doc)=>{
            if(doc){
               resolve(doc)
            }else{
                resolve(null)
            }
        })
          .catch(err=>reject(err))
    })
}