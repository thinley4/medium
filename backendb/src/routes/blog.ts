import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlog, updateBlog } from "@thinley/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string,
        DATABASE_URL: string
    }, 
    Variables: {
        userId: string;
    }
}>()

// middleware for protected route
blogRouter.use('/*', async(c, next)=> {
    const token = await c.req.header("authorization") || "";
    try {
        const user = await verify(token, c.env.JWT_SECRET)
        
        if(user){
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.text("Not logged In")
        }
    }catch(e){
        return c.text("Not logged")
    }
});

blogRouter.post('/', async(c, next)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,  // Get data from wrangler.toml
      }).$extends(withAccelerate())
    const body = await c.req.json();

    // Got userId from middleware
    const userId = c.get("userId");
    
    
    try {
        const {success} = createBlog.safeParse(body);
        if(!success){
            c.status(411);
            return c.text("Input invalid")
        }

        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        
        
        return c.json({
            id: blog.id
        })
    } catch(e) {
        
        return c.text("Invalid")
    }
})
  
blogRouter.put('/', async(c)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,  // Get data from wrangler.toml
      }).$extends(withAccelerate())
    const body = await c.req.json();

    try {
        const {success} = updateBlog.safeParse(body);
        if(!success) {
            c.status(411);
            return c.text("Invalid input")
        }
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            id: blog.id
        })
    } catch(e) {
        return c.text("Invalid")
    }
})

// Add pagination
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            blogs
        })
    } catch(e) {
        return c.text("Error while fetching blog")
    }
})
  
blogRouter.get('/:id', async(c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,  // Get data from wrangler.toml
      }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    } catch(e) {
        return c.text("Error while fetching post blog")
    }
  })

blogRouter.delete('/', async(c)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,  // Get data from wrangler.toml
    }).$extends(withAccelerate())

    const deleteUser = await prisma.post.deleteMany({})
    return c.text("Success")

})