import {io} from "socket.io-client"
import {getCookie} from "./cookie"
import {DOMAIN} from "./api"

const TOKEN = getCookie("crm_token_access")

const socket = io(DOMAIN, {
    auth: {
        token: TOKEN
    }
}).connect()

export default socket
