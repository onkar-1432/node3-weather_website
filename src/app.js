const path=require('path')
const express =require('express')
const hbs=require('hbs')
const { query } = require('express')

const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')





// define paths for express config
const p=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../template/views')
const partialPath=path.join(__dirname,'../template/partials')

const app=express()
const port =process.env.PORT || 3000
//setup handlebars
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(p))


app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'onkar'
    })
}) 

app.get('/help',(req,res)=>{
    res.send({
        name:'onkar',
        age :'18'
    })
}) 
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'error 404',
        error_msg:'help article not found'
    })
}) 

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about me",
        name:"onkar"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
      res.send({
          error:"adress must be provided"
      })
      
    }
    else
    {
        
            geocode(req.query.address,(error,{lattitude,longitude}={})=>{
                if(error)
                {
                    res.send("tjhere is error")
                    return;
                }
                forecast(lattitude,longitude, (error, data) => {
                 if(error){
                     res.send("error at location")
                     return;
                 }
                    res.send({
                        forecast:data,
                        location:req.query.address
                    })
                  })
            
            })
        
    }
    
    // return res.send({
    //     address:req.query.address,
    // })
   
})


app.get('*',(req,res)=>{
    res.render('error',{
        title:'error 404',
        error_msg:'page not found'

    })

})
app.listen(port,()=>{
    console.log("sever is on port"+port)
})