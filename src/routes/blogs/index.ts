import express, { Request, Response } from "express";

import dataJson from "../../blogsData.json";
import { BlogType, PostBlogType, PutBlogType } from "./types";

import { createBlogValidation } from "./validation";
import { basicAuth } from "../../middlewares/auth";
import { inputValidation } from "../../middlewares/input-validation";

import { HttpResponses } from "../../const";

let data: BlogType[] = dataJson;

const blogsRouter = express.Router();

blogsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = data.find((v) => v.id === id);

  if (!blog)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Blog with id ${id} doesn't exist!`);

  return res.status(HttpResponses.OK).send(blog);
});

blogsRouter.get("/", (req: Request, res: Response) => {
  res.status(HttpResponses.OK).send(data);
});

blogsRouter.post(
  "/",
  basicAuth,
  createBlogValidation,
  inputValidation,
  (req: Request, res: Response) => {
    const { name, description, websiteUrl } = req.body as PostBlogType;

    const newBlog = {
      id: String(data.length),
      name,
      description,
      websiteUrl,
    };

    data.push(newBlog);
    return res.status(HttpResponses.CREATED).send(newBlog);
  }
);

blogsRouter.put(
  "/:id",
  basicAuth,
  createBlogValidation,
  inputValidation,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = data.find((v) => v.id === id);

    const { name, description, websiteUrl } = req.body as PutBlogType;

    if (!blog)
      return res
        .status(HttpResponses.NOT_FOUND)
        .send(`Blog with id ${id} doesn't exist!`);

    blog.name = name;
    blog.description = description;
    blog.websiteUrl = websiteUrl;

    return res.sendStatus(HttpResponses.NO_CONTENT);
  }
);

blogsRouter.delete("/:id", basicAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const blogIndex = data.findIndex((v) => v.id === id);

  if (blogIndex === -1) {
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Blog with id ${id} doesn't exist!`);
  }

  data.splice(blogIndex, 1);

  return res.sendStatus(HttpResponses.NO_CONTENT);
});

export { blogsRouter };
