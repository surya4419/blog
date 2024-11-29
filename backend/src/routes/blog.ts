import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { decode, sign, verify } from "hono/jwt"
import { createPostInput,updatePostInput } from "@23951a67h1/medium-common"

export const blogRouter = new Hono<{ 
    Bindings: {
      DATABASE_URL: string ,
      JWT_SECRET:string,
    },
    Variables:{
        userId: string,
    }
  }>()   


  blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET)
        if (user) {
            c.set("userId", user.id as string);
            await next()
        }else{
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (error) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    } 
  })


  blogRouter.post('/',async (c) => {
    
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
        }
    }) 

    return c.json({
        id: post.id
    })
    
  })
  
  blogRouter.put('/', async (c) => {
   
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
	const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    const post = await prisma.post.update({
        where:{
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        }
    }) 

    return c.json({
        id: post.id
    })
    
  })
  
  blogRouter.get('user/:id', async (c) => {
    const id =  c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const post = await prisma.post.findFirst({
            where:{
                id: id
            },
            select:{
                id:true,
                title: true,
                content: true,
                author:{
                    select:{
                        name: true
                    }
                }
            }
        }) 
        return c.json({
             post
        })
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        })
    }

})
  
  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const posts = await prisma.post.findMany({
        select:{
            content: true,
            title: true,
            id: true,
            author:{
                select:{
                    name: true
                }
            }
        }
    });

    return c.json({
        posts
    })
  });


  
  
  
  