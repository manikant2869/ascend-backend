module.exports = {
    sendResponse : async function (result,req,res){
       if(result.err){
         throw new Error(result.err) 
       }else{
          res.send(result)
       }
   }
}