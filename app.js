if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001; 
const palindromeModel = require('./models/index')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors()) 

mongoose.connect(`mongodb://${process.env.USERNAME123}:${process.env.PASSWORD}@cluster0-shard-00-00-s62ed.mongodb.net:27017,cluster0-shard-00-01-s62ed.mongodb.net:27017,cluster0-shard-00-02-s62ed.mongodb.net:27017/palindrome-2?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, {useNewUrlParser: true},()=>{
})
.then(data=>{
    console.log('mongodb is connected');
})
.catch(err=>{
    console.log(err)
})


app.get('/',(req,res,next)=>{
    res.send('HOME OF API')
})

app.get('/palindrome' , (req,res,next)=>{
    palindromeModel.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message : "internal server error"
        })
    })
})

app.post('/palindrome' ,(req,res,next)=>{
    let kata = req.body.word
    let temp = ""
    let temp2 = ""
    let num = kata.length -1;
    for(let i =  0; i < kata.length; i++) {
        if(kata[i] !== " "){
            temp += kata[i]
        }
        if(kata[num] !== " ") {
            temp2 += kata[num]
        }
        num--;
    }
    if(temp2 == temp) {
        palindromeModel.create({
            Word : kata
        })
        .then(data=>{
            res.json({
                response : true,
                word : kata
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message : "Internal Server Error"
            })
        })
    }else {
        res.json({
            response : false
        })
    }
})

app.delete("/palindrome/:id" , (req,res,next)=>{
    let id = req.params.id
    palindromeModel.deleteOne({
        _id : id
    })
    .then(data=>{
        res.json({
            message : "Sukses Delete"
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message : "Internal Server Error"
        })
    })
})

app.listen(port,()=>{
    console.log('listening to port ',port);
})