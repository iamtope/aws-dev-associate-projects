import {getProduct, getProducts, createProduct}  from "./service.js"
export const handler = async(event) => {
    console.log("request:", JSON.stringify(event, undefined, 2));
    let body;
    switch(event.httpMethod) {
        case "GET":
            if(event.pathParameters ){
                body = await getProduct(event.pathParameters.id);
            }
            else{
                body = await getProducts();
            }
        case "POST":
            body = await createProduct(event);
            break;

        default:
            throw new Error("Unsupported http method");
    }
    const response = {
        statusCode: 200,
        body: `Hello from product! You hit ${event.path}`,
    };
    return response;
};
