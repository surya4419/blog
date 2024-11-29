import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { decode, sign, verify } from "hono/jwt"
import z from "zod";
import { signinInput, signupInput } from "@23951a67h1/medium-common";



export const userRouter = new Hono<{ 
    Bindings: {
      DATABASE_URL: string ,
      JWT_SECRET:string,
    }
  }>() 


  userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(400);
      return c.json({error:"invalid input"})
    }
  
    try {
      const user =  await prisma.user.create({
        data:{ 
          name:body.name,
          email: body.email,
          password:body.password,
        }
      });
      const token = await sign({id: user.id},c.env.JWT_SECRET);
     
    return c.json({
      jwt: token,
     
    })
    } catch (error) {
      c.status(403);
      console.log(error)
      return c.json({error:"error while signing up"})
    }
  
    
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  

    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(400);
      return c.json({error:"invalid input"})
    }
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
        password: body.password
      }
    });
  
    if(!user){
      c.status(403);
      return c.json({error:"user not found"})
    }
  
    const jwt = await sign({id:user.id},c.env.JWT_SECRET);
    
    return c.json({jwt})
  })