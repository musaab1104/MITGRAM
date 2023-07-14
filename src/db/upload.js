const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://manan241202:aARSs8FQlYMWp9nB@cluster0.ojlp19m.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.log('Error connecting to MongoDB Atlas: ', error);  
});