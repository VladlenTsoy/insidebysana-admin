import {io} from "socket.io-client"
import {getCookie} from "./cookie"
import {DOMAIN_API} from "./api"

const TOKEN = getCookie("crm_token_access")

const socket = io(DOMAIN_API, {
    auth: {
        token: TOKEN
    }
}).connect()

export default socket
