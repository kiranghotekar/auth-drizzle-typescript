import {createServer} from "node:http";
import {createApplication} from "./app/index.js"


async function main(){
    try{
        const server = createServer(createApplication())
        const PORT: number = 3001

        server.listen(PORT , ()=>{
            console.log(`Server is running on PORT ${PORT}`)
        })

    }catch(error){
        console.log("Error in starting http server")
        throw error 
    }
}


main()