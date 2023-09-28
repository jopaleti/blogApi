const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const router = require('./routes/index.js');
const methodOverride = require('method-override');

const app = express();

const blog = [
    {
        id: 1,
        name: 'Gbolagade',
        title: 'Killing of innocent people in Owo.',
        description: 'Killing attack incident in owo today',
        markdown: 'The incident happened after the church service, when people were about to disperse to their respective location. The suspects were reported to had hidden in the bush and waited for the people to come out of the church.',
        time: new Date(),
    },
    {
        id: 2,
        name: 'Anonymous',
        title: 'Suggestion on the church attack',
        description: 'My suggestion on the incident happened',
        markdown: 'The reason for this incident has been the lack of security in Nigeria. How can someone smuggle in ammunition to a state without been detected by the security officers. We need to increase the level of security in Nigeria.',
        time: new Date(),
    },
    {
        id: 3,
        name: 'Clinton',
        title: 'Solution to the sad news in Owo.',
        description: 'What government should do to this inccessant killing of people.',
        markdown: 'Government should try to increase the level of security standard in Nigeria. Knowing the fact that security is lacked in this country everybody should be prayerful and be at alert all the time. May the lord bring down the evil incident in Nigeria.',
        time: new Date(),
    }
]
// middlewares
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: false}));

mongoose.connect('mongodb://127.0.0.1:27017/info', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res=>console.log('Connected to database successfully!!!'))
.catch(err=>console.log(err));

app.get('/', (req, res) =>{
    res.render('index.ejs')
})

// app.get('/v1', (req,res) =>{
//     for(let i=0; i< 10000000000000000000000000; i++){
//     }
// })


app.get("/v2", (req, res) => {
    console.log("response")
});

// Router middleware
app.use('/blog', router);

app.get('/all', (req, res)=>{
    res.render('blog', {blog: blog})
})

app.listen('5000', ()=>{
    console.log('Server now running on port 5000');
})