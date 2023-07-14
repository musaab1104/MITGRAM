const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://manan241202:aARSs8FQlYMWp9nB@cluster0.ojlp19m.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    console.log('connection successful');
}).catch((e)=> {
    console.log('not connected');

})     