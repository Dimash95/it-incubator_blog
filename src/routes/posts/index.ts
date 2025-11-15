import express, { Request, Response } from "express";

import postsJson from "../../postsData.json";
import blogsJson from "../../blogsData.json";

import { PostType, PostPostType, PutPostType } from "./types";
import { BlogType } from "../blogs/types";

import { validatePostBody } from "./validation";
import { HttpResponses } from "../../const";

let blogsData: BlogType[] = blogsJson;
let postsData: PostType[] = postsJson;

const postsRouter = express.Router();

postsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const post = postsData.find((v) => v.id === id);

  if (!post)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Post with id ${id} doesn't exist!`);

  return res.status(HttpResponses.OK).send(post);
});

postsRouter.get("/", (req: Request, res: Response) => {
  res.status(HttpResponses.OK).send(postsData);
});

postsRouter.post("/", (req: Request, res: Response) => {
  const validation = validatePostBody(req.body, res);
  if (validation) return;

  const { title, shortDescription, content, blogId } = req.body as PostPostType;
  const blog = blogsData.find((v) => v.id === blogId);

  if (!blog)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Blog with id ${blogId} doesn't exist!`);

  const newPost = {
    id: String(postsData.length),
    title,
    shortDescription,
    content,
    blogId,
    blogName: blog.name,
  };

  postsData.push(newPost);

  return res.status(HttpResponses.CREATED).send(newPost);
});

postsRouter.put("/:id", (req: Request, res: Response) => {
  const validation = validatePostBody(req.body, res);
  if (validation) return;

  const { id } = req.params;
  const post = postsData.find((v) => v.id === id);

  const { title, shortDescription, content, blogId } = req.body as PutPostType;

  if (!post)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Post with id ${id} doesn't exist!`);

  const blog = blogsData.find((v) => v.id === blogId);

  if (!blog)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Blog with id ${blogId} doesn't exist!`);

  post.title = title;
  post.shortDescription = shortDescription;
  post.content = content;
  post.blogId = blogId;
  post.blogName = blog.name;

  return res.sendStatus(HttpResponses.NO_CONTENT);
});

postsRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const postIndex = postsData.findIndex((v) => v.id === id);

  if (postIndex === -1) {
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Post with id ${id} doesn't exist!`);
  }

  postsData.splice(postIndex, 1);

  return res.sendStatus(HttpResponses.NO_CONTENT);
});

export { postsRouter };
