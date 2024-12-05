import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const prerender = false; 

export const GET: APIRoute = async ({ params, request}) => {

    const blogPost: CollectionEntry<"blog">[] = await getCollection("blog");

    const url = new URL(request.url)

    const slug = url.searchParams.get("slug") 
 
    if(slug) {
        const posts = blogPost.filter(p  => p.slug === slug)
        if(posts.length > 0){
            return new Response(JSON.stringify(posts), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        return new Response(JSON.stringify({msg: `No se encontro el post con el path ${slug}`}), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }



    return new Response(JSON.stringify(blogPost), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    })
}