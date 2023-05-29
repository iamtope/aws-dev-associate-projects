import {GetItemCommand, ScanCommand, PutItemCommand} from "@aws-sdk/client-dynamodb";
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb";
import ddbClient from "./ddbClient.js";
import {v4 as uuidv4} from "uuid";


export const getProduct = async (id) => {
    console.log("getProduct");
    try {
        const params = {
            TableName: process.env.PRODUCT_TABLE,
            Key: marshall({id: id})
        }
        const {Item} = await ddbClient.send(new GetItemCommand(params));
        console.log(Item);
        return (Item)?  unmarshall(Item) : {};
        
    } catch (error) {
        console.log(error);
        throw error;     
    }
}

export const getProducts = async () => {
    console.log("getProducts");
    try{
        const params = {
            TableName: process.env.PRODUCT_TABLE
        }
        const {Items} = await ddbClient.send(new ScanCommand(params));
        console.log(Items);
        return (Items)?  Items.map((item) => unmarshall(item)) : {};
        

    }catch{
        console.log(error);
        throw error;  
    }
}

export const createProduct = async (event) => {
    console.log("createProduct");
    try {
        const body = JSON.parse(event.body);
        const productId  = uuidv4();
        body.id = productId;
        const params = {
            TableName: process.env.PRODUCT_TABLE,
            Item: marshall(body || {})
        }
        const {Item} = await ddbClient.send(new PutItemCommand(params));
        console.log(Item);
        return (Item)?  unmarshall(Item) : {};
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

