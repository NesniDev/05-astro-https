import type { APIRoute } from "astro";
import { clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({params, request}) => {

    const clientId = params.clientId ?? ""
    
    const clientsFiltered = await db.select().from(clients).where(eq(clients.id, +clientId))

    if(clientsFiltered.length === 0){
        return new Response(JSON.stringify({msg: "Error al obtener el cliente"}), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return new Response(JSON.stringify(clientsFiltered), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    })
}


export const DELETE: APIRoute = async ({params, request}) => {

    const clientId = params.clientId ?? ""
    
    const response = await db.delete(clients).where(eq(clients.id, +clientId))
    
    return new Response(JSON.stringify({msg: "Se ha eliminado el cliente con el id " + clientId}), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const PATCH: APIRoute = async ({params, request}) => {
    
    const clientId = params.clientId ?? ""

    try{
        const {id, ...body} = await request.json()

        const response = await db.update(clients).set(body).where(eq(clients.id, +clientId)) 


        const updateClient = await db.select().from(clients).where(eq(clients.id, +clientId))

        return new Response(JSON.stringify(updateClient), {
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