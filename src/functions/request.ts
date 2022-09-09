import axios, { AxiosPromise } from 'axios'
import { getAuth } from 'firebase/auth';


const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_SERVER_URL}`,

});



export const get = async (url: string) => {
    const auth = await getAuth().currentUser?.getIdToken();
    return instance.get(url, {
        headers: {
            'Authorization': 'Bearer ' + auth,
        }
    }
    )

}



