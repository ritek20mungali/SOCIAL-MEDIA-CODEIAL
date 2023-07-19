const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial-env',{
useNewUrlParser:true,
})
.then(val=>console.log('db connected'))
.catch(err=>console.log(err))