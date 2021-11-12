import type { Polka as Server} from "polka"
import polka from "polka"

class Kernel {
    protected server:Server | undefined

    startServer(port=3000){
        const server = polka()
        server.listen(port, ()=>{
            console.log('server run on port: '+[port])
        })
        this.server = server
    }
}

export default Kernel