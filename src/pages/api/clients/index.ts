import type { APIRoute } from "astro";
import { clients, db } from "astro:db";
    
export const prerender = false;

export const GET: APIRoute = async ({params, request}) => {

    try {
        const body = await db.select().from(clients)
        return new Response(JSON.stringify(body), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }catch(e){
        return new Response(JSON.stringify({msg: "Error al obtener el cliente"}), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        })
}}

export const POST: APIRoute = async ({params, request}) => {
    try{
        const {id, ...body} = await request.json()

        const {lastInsertRowid} = await db.insert(clients).values(body)

        return new Response(JSON.stringify({
            id: +lastInsertRowid!?.toString(),
            ...body
        }), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }catch(e){
        return new Response(JSON.stringify({msg: "Error al crear el cliente"}), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}