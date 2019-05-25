const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/froecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{ 
     res.render('index',{title:'Weather App',name:'Nabeel'})
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About Me',
        name: 'Nabeel'
    })

})

app.get('/help',(req,res)=>{

    res.render('help',{
        helpText:'This is some helpful text.',
        title: 'Help',
        name:'Nabeel'
    })

})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:'You must provide the addresss'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude, placename}={})=>{
        if(error){
         return  res.send({error})
        }
    forecast(latitude,longitude, (error, {summary}) => {
        if(error){
            return  res.send({error})
        }
    res.send({forecast:summary,location:placename,address: req.query.address})
})
})
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
           return res.send({
                error: 'You must provide a search term!'
                
            })
    }
    
        console.log(req.query)
        res.send({
            products:[]
        })
   
   
})

app.get('/help/*',(req, res)=>{
 res.render('404',{
    title:'404',
    name:'Nabeel',
    errorMessage:'Help Article not found!'
 })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Nabeel',
        errorMessage:'Page not found'
    })

})

// app.com
// app.com/help
// app.com/about

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
});