import axios from "axios";

class MaterialService{
    myVar = 1;
constructor(){

}

async TestMethod(){
    var result = await axios.get("https://localhost:7032/api/Material/GetAllMaterialsAsync",(res) => {
        console.log("service call result");
        console.log(res);
        return res;
    },(err) => {
       return err
    });

    return result;
}

};

export default new MaterialService();