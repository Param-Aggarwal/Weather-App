const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode =require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3001

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=> {
    res.render('index',{
        title:'weather App',
        name:'param'})

})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:'About me',
        name:'param'})

})

app.get('/help',(req,res)=> {
    res.render('help',{
        title:'help me page',
        name:'param'})

})

// console.log(path.join(__dirname,'../public'))


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }

    geoCode(req.query.address,(error,{latitude, longitude,location}={})=>{
    if(error){
            return res.send({error})
    }
    forecast(longitude, latitude, (error, forecastData) => {
    if(error){
            return res.send({error})
    }
    else{
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

    }
    })

    })

})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'you must provide a search term'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products:[]

//     })
// })



// it is used for 404 page inside the option
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 help page',
        name:'param'})

})


// it is used for 404 page
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        name:'param'})

})

app.listen(port,()=>{
    console.log('Server is up on port port '+port)
})
