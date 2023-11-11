import axios from "axios";

class PurchaseService{
    myVar = 1;
constructor(){

}

async TestMethod(){
    var result = await axios.get("https://localhost:7199/api/Purchase/GetAllPurchasesAsync",(res) => {
        console.log("service call result");
        console.log(res);
        return res;
    },(err) => {
       return err
    });

    return result;
}

};

export default new PurchaseService();