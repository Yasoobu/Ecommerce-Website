const expressModule = require("express")
const app = expressModule()
app.use(expressModule.json())
const Joi = require("joi")
const cors = require("cors")

let products = [{ id:1, name: "Product 1" , stock: 2, price: 30000.00, shortDesc: "Apple Airpods", description: "This is description", image: ""}]
const users = [{ id:1, name: "Admin" , email: "admin@example.com" , password: "password", city: "Lahore"}]

const mysql = require('mysql');   
const con = mysql.createConnection({
    host: 'localhost',
    user: 'Yasoob',
    password: '12345678',
    database: 'ecommerce'
  });

con.connect((err) => {
if(err){
  console.log('Error connecting to Db' + err.message);
  return;
}
console.log('Connection established');
});

// con.query('SELECT * FROM users', (err,rows) => {
//     if(err) throw err;
  
//     console.log('Data received from Db:');
//     console.log(rows);
// });
  
//app.options("/addProduct", cors())

app.listen(3001, ()=>{
    console.log("Server started: Listening at port 3001")
})

app.post("/login", (request, response)=>{
    console.log("Login page called")
    response.header("Access-Control-Allow-Origin", "*")
    let query = 'SELECT * FROM users WHERE email = ' + request.params.email
    con.query(query, (err,user) => {
        if(err) throw err;
        console.log(err.message)
        if(request.params.email === user.email && request.params.password === user.password){
            userToAdd = {id: user.id, name: user.name , email: user.email , password: user.password, city: user.city};
            //users.push(userToAdd);
            console.log(userToAdd);
            response.send(users[0]);
        }
    });

    response.send(users);
})

app.get("/", (request, response)=>{
    console.log("Home Page called at server")
    response.header("Access-Control-Allow-Origin", "*")
    con.query('SELECT * FROM products', (err,rows) => {
        if(err) throw err;
        //products = []
        rows.map((product) => {
            productToAdd = {id: product.id, name: product.name , stock: product.stock, price: product.price, shortDesc: product.shortDesc, description: product.description, image: product.image};
            console.log(productToAdd);
            products.push(productToAdd);
        })
    });
    console.log(products);
    response.send(products);
})
    
app.get("/products", (request, response)=>{
    console.log("Products page called at server")
    response.header("Access-Control-Allow-Origin", "*")
    con.query('SELECT * FROM products', (err,rows) => {
        if(err) throw err;
        
        //let products1 = []
        rows.map((product) => {
            productToAdd = {id: product.id, name: product.name , stock: product.stock, price: product.price, shortDesc: product.shortDesc, description: product.description, image: product.image};
            console.log(productToAdd);
            products.push(productToAdd);
        })
        console.log(products);
        response.send(products);
    });
})

 

    
app.get("/products/:id", (request, response) => {
    //response.send(projects[request.params.id-1])
    response.header("Access-Control-Allow-Origin", "*")
    con.query('SELECT * FROM products WHERE id='+request.params.id, (err,row) => {
        if(err) throw err;
    
        console.log('Product received from Db:');
        console.log(row);
    });
    response.send(row);
})

    
app.post("/addProduct", (request, response)=>{
    console.log("Add Product method called")
    console.log(request.body)
    const productToAdd = {name: request.body.name , stock: request.body.stock, price: request.body.price, shortDesc: request.body.shortDesc, description: request.body.description, image: request.body.image}
    const error = validate_product(productToAdd)
    response.header("Access-Control-Allow-Origin", "*")
    if(error){
        console.log("Error in validation: "+ error.details[0].message)
        response.send(error.details[0].message)
        //response.status(404).send(error.details[0].message)
        return
    }
    con.query('INSERT INTO products SET ?', productToAdd, (err, res) => {
        if(err) throw err;
    })
    console.log("Product added: " + productToAdd.name)
    //response.send(products)
})
    
function validate_product(product) {
    const schema = Joi.object({
        id: Joi.number().min(1),
        name: Joi.string().alphanum().required(),
        stock: Joi.number(),
        shortDesc: Joi.string(),
        description: Joi.string()
    })
    const result = schema.validate(product)
    return result.error    
}

//con.end((err) => {
// The connection is terminated gracefully
// Ensures all remaining queries are executed
// Then sends a quit packet to the MySQL server.
//});  