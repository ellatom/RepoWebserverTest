const express = require('express')

const app = express();


let data =[{ "id": "2", "name": 'Andrew Mead', "age": "18" }, { "id": "1", "name": 'Ella Ginzburg', "age": "30" }];
let dataProducts=[{ "id": "2", "product": 'Apple'},{"id":"3","product":"Orange"}];

//postman get :http://localhost:3030/users
//or curl http://localhost:3030/users
//another option res.send(JSON.stringify({key:"value"}));
app.get('/users', (req, res) => {
    try{
        res.json(data);
    }
    catch(error)
    {
        res.send({ error: 'Error'+error});
    }
})
//postman get :http://localhost:3030/products
app.get('/products', (req, res) => {
    try{
    res.json(dataProducts);
    }
    catch(error)
    {
        res.send({error: 'Error'+error});
    }
})
//postman post:http://localhost:3030/user body(raw):{"id":"4","name":"Arabel","age": "20"}
//not use bodyparser.json()=deprecated
app.use(express.json());
app.post('/user', (req, res) => {
    try
    {
        console.log(req.body.id);
        let find = data.find(item => req.body.id === item.id);
        console.log(data);
        
        if(!find)    
        {
            data.push(req.body);
            res.send({ message: 'User Added',code:res.statusCode });
            console.log(data);
        }
    }
    catch(error){
        res.send({ error: 'User Already exists' });
    }
})

//postman post:http://localhost:3030/product body(raw):{"id":"4","product":"Onion"}
//not use bodyparser.json()=deprecated
app.use(express.json());
app.post('/product', (req, res) => {
    try{
        let find = dataProducts.find(item => req.body.id === item.id);
        if(!find)
        {
            dataProducts.push(req.body);
            res.send({ message: `Product Added`,code:res.statusCode});
            console.log(dataProducts)
        }
    }
    catch(error)
    {
        res.send({ error: `Product Already exists`});
    }

})
//postman delete:http://localhost:3030/user/1
app.delete('/user/:id', (req, res) => {

    try{
        data = data.filter(item => req.params.id !== item.id);
        console.log(data.length)
        if(!data)
        {
            res.send({ message: 'User not found' });
            console.log(data)
            return;
        }
        res.send({ message: 'User Deleted' });
        console.log(data)
    }
    catch(error)
    {
        res.send({ error: `User Already exists`});
    }
    // console.log(data[0].id)
    // console.log(req.params.id);
    
})


//postman PUT:http://localhost:3030/user/1   body:{"id": "1", "name":"Ella Tomolin", "age": "30"}
app.put('/user', (req, res) => {

    try{
        console.log(req.body.id);
        let foundIndex = data.findIndex(item => req.body.id === item.id);

        if(foundIndex)
        {
            data[foundIndex]=req.body;
            console.log(data);

            res.send({ message: 'User Updated' });
        }
    }
    catch(error)
    {
        res.send({ error: 'User Not exists'});
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})

//decide which port to run webserver on
app.listen(3030, () => {
    console.log('Server is up on port 3030.')
})