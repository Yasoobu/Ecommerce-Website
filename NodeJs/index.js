#!/usr/bin/env node



    //EXPRESS MODULE GET AND POST AND VALIDATE THRU JOI 
const Joi = require("joi")
const cors = require("cors")
const { response } = require("express")
const expressModule = require("express")
const app = expressModule()
app.use(expressModule.json())
const products = [
    { id:1, name: "Product 1" , stock: 2, price: 15000.00, shortDesc: "Apple Airpods", description: "This is description"},
    { id:2, name: "Product 2" , stock: 4, price: 3500.00, shortDesc: "Beats ET", description: "This is description"},
    { id:3, name: "Product 3" , stock: 3, price: 1500.00, shortDesc: "I12 TWS Inpods", description: "This is description"}
]
    
app.options("/addProduct", cors())
    
// app.get("/", (request, response)=>{
//     console.log("Home Page called")
//     response.send([1,2,3])
// })
    
// app.get("/products", (request, response)=>{
//     console.log("Products page called at server")
//     response.header("Access-Control-Allow-Origin", "*")
//     response.send(products)
// })
 
// app.listen(3001, ()=>{
//     console.log("Server started: Listening at port 3001")
// })
    
// app.get("/products/:id", (request, response) => {
//     //response.send(projects[request.params.id-1])
//     response.header("Access-Control-Allow-Origin", "*")
//     var selected_product = products.find((product) => {
//         return product.id === parseInt(request.params.id)
//     })
//     response.send(selected_product)
// })

// app.post("")
    
// app.post("/addProduct", (request, response)=>{
//     console.log("Add Product method called")
//     console.log(request.body)
//     const productToAdd = {id: products.length + 1, name: request.body.name , stock: request.body.stock, price: request.body.price, shortDesc: request.body.shortDesc, description: request.body.description}
//     const error = validate_product(productToAdd)
//     response.header("Access-Control-Allow-Origin", "*")
//     if(error){
//         console.log("Error in validation: "+ error.details[0].message)
//         response.send(error.details[0].message)
//         //response.status(404).send(error.details[0].message)
//         return
//     }
//     products.push(productToAdd)
//     console.log("Product added")
//     response.send(products)
// })
    
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