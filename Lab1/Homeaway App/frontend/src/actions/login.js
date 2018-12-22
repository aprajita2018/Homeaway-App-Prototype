import axios from "axios";

export const LOGIN_USER = "login_user"

export function login(values, callback) {
        
    const request = axios.post('/login', values)
        .then((res) => {
            if(res.status === 200){  
                callback();
            }
        });

        return {
            type : LOGIN_USER,
            payload: request
        };
    }
