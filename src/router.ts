import express from "express";
import { Request, Response } from "express";
import { BlogType, PostBlogType, PutBlogType } from "./types";
import dataJson from "./data.json";
import { HttpResponses } from "./const";

let data: BlogType[] = dataJson;

const apiRouter = express.Router();

apiRouter.delete("/testing/all-data", (req: Request, res: Response) => {
  data = [];

  return res.sendStatus(HttpResponses.NO_CONTENT);
});

apiRouter.get("/blogs/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = data.find((v) => v.id === Number(id));

  if (!blog)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Blog with id ${id} doesn't exist!`);

  return res.status(HttpResponses.OK).send(blog);
});

apiRouter.get("/blogs", (req: Request, res: Response) => {
  res.status(HttpResponses.OK).send(data);
});

apiRouter.post("/blogs", (req: Request, res: Response) => {
  const { name, description, websiteUrl } = req.body as PostBlogType;

  // const validationResult = validateBlogBody(req.body, res);
  // if (validationResult) return;

  const newBlog = {
    id: data.length,
    name,
    description,
    websiteUrl,
  };

  data.push(newBlog);
  return res.status(HttpResponses.CREATED).send(newBlog);
});

apiRouter.put("/blogs/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = data.find((v) => v.id === Number(id));

  // const validationResult = validateVideoBody(req.body, res);
  // if (validationResult) return;

  const { name, description, websiteUrl } = req.body as PutBlogType;

  if (!blog)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Blog with id ${id} doesn't exist!`);

  blog.name = name;
  blog.description = description;
  blog.websiteUrl = websiteUrl;

  return res.sendStatus(HttpResponses.NO_CONTENT);
});

apiRouter.delete("/blogs/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const blogIndex = data.findIndex((v) => v.id === Number(id));

  if (blogIndex === -1) {
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Blog with id ${id} doesn't exist!`);
  }

  data.splice(blogIndex, 1);

  return res.sendStatus(HttpResponses.NO_CONTENT);
});

export { apiRouter };
