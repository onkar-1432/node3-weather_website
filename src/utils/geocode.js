const request=require('request')

const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?types=address&access_token=pk.eyJ1Ijoib25rYXJ2aXJhbGVrYXIiLCJhIjoiY2txa3NzbzRjMDFteTJucXczOGsxNnN6cyJ9.3Noihqvubf9nsFKdMfeBcg&limit=1";
     request({url,json:true},(error,{body})=>
     {
         if(error)
         {
             callback('unable to connect',undefined);
 
         }
         else if(body.features.length===0)
         {
             callback('unable to find location try another search',undefined);
            
         }
         else{
             callback(undefined,{
                 lattitude:body.features[0].center[1],
                 longitude:body.features[0].center[0],
                 city_name:body.features[0].place_name
             })
            
 
 
         }
 
     })
 } 
 
 

module.exports=geocode