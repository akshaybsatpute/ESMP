const express=require('express')
const app=express()
const port=3000
const User = require('./User');

// const flash=require('flash')
const connection = require('./sqlconnect');
const { findByIdAndUpdate } = require('./User');


app.use(express.static('public'))
app.use('/css', express.static(__dirname+'public/css'))
app.use('/js', express.static(__dirname+'public/js'))
app.use('/images', express.static(__dirname+'public/images'))
// app.use(flash())

app.set('views','./views')
app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connection();


const timeInMilli=()=> {
    var date=new Date().getTime();
    return date;
}




app.get('/', (req,res)=>{
    User.find((err, result)=>{
        //console.log("FROM DATABASE",result)
        res.render('index', {rows: result})
    })
})

app.post('/', async (req, res)=>{
    // if(req.body.isPaid){
    //     console.log("PAID");
    // } else{
    //     console.log("UNPAID");
    // }
    let vehicleNo = req.body.VehicleNo;
    console.log(vehicleNo);
    if(vehicleNo){
        await User.find({ vehicle_no : vehicleNo },async (err, result) => {
            if(result.length > 0){
                let id = result[0]._id;
                if(result[0].out_time == 0){
                    User.findByIdAndUpdate(id, { $set: { out_time : timeInMilli()}},(err, res) => {
                        //console.log(res);
                    })
                } 
                if(req.body.isPaid){
                    User.findByIdAndUpdate(id, { $set: { isPaid : true } },(err,res) => {
                        console.log("ERROR", err);
                        console.log("SUCCESS", res);
                    });
                }
            }
            else {
                let user = new User({
                    vehicle_no : vehicleNo,
                    in_time: timeInMilli(),
                })
                await user.save();
                console.log("NO");
            }
        })
    }

    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`server is running at port http://localhost:${port}`)
})

