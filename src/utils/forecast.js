const request=require('request')

const forecast=(lattitude,longitude,callback)=>{
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+(lattitude)+"&lon="+(longitude)+"&APPID=9bad5d7012607f8a307e8e1f5d8e6c4f";
     request({url,json:true},(error,{body})=>
     {
         if(error)
         {
             callback('unable to connect',undefined);
 
         }
         else if(body.error)
           {
             console.log("unable to connect weather beacause of wrong cordinates")
           }
         else{
             callback(undefined,
                
              "At " +body.name+" temp is "+body.main['temp']+" and weather is "+body.weather[0].main+" \n Min temp is "+body.main.temp_min+"Max temp is"+body.main.temp_max+"."


             )
            
 
 
         }
 
     })
 } 
 

 module.exports=forecast