import axios from "axios";

const baseurl = `http://172.16.17.2:8080/ords/market/tbl/`
export const officerApi ={
    officerApi_master(url=baseurl+`officers`){
        return{
            fetchAll:()=>axios.get(url),
            create:(newrecord)=>axios.post(url,newrecord),
            //update:
        }
    }
}