import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge' // must be /edge
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import { signinInput, signupInput } from "@thinley/medium-common";

export const userRouter = new Hono<{
    Bindings: {
      JWT_SECRET: string;
      DATABASE_URL: string;
    }
  }>()


userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,  // Get data from wrangler.toml
    }).$extends(withAccelerate())
    const body = await c.req.json();
  
    try {
      const {success}= signupInput.safeParse(body);  // password minimum 3 letter
      
      if(!success){
        c.status(411);
        return c.text("Input not correct")
      }
  
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      })
      
      
      const token = await sign({id: user.id}, c.env.JWT_SECRET);
      return c.json({
        token
      })
    } catch(e) {
      console.log(e);
      
      
      c.status(404);
      return c.text("Error")
    }
  })
  
  userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,  // Get data from wrangler.toml
    }).$extends(withAccelerate())
    const body = await c.req.json();
  
    try {
      const {success} = signinInput.safeParse(body); //password minimum 6 letter
      if(!success){
        c.status(411);
        return c.text("Input Invalid")
      }
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password
        }
      })

      if(user == null){
        c.status(404);
        return c.text("Invalid credential")
      }
  
      const token = await sign({id: user.id}, c.env.JWT_SECRET);
      return c.json({
        token
      })
  
    } catch(e) {
      return c.text("Invalid");
    }
  })