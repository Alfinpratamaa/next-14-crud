import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";

const prisma = new PrismaClient();

export const PUT = async (req: Request,{params}:{params : {id:string}}) =>{
    try {
        const body: Product = await req.json()
        const product = await prisma.product.update({
            where:{
                id: Number(params.id)
            },
            data:{
                name: body.name,
                price: body.price,
                brandId: body.brandId
            }
        }) 
        return NextResponse.json(product,{status:200})
    } catch (error) {
        console.log(error)
    }
}
export const DELETE = async (req: Request,{params}:{params : {id:string}}) =>{
    try {
        
        const product = await prisma.product.delete({
            where:{
                id: Number(params.id)
            }
        }) 
        return NextResponse.json(product,{status:200})
    } catch (error) {
        console.log(error)
    }
}

