import express, { Request, Response } from "express";
import { PostType, PostPostType, PutPostType } from "./types";
import dataJson from "../../postsData.json";
import { HttpResponses } from "../../const";

let data: PostType[] = dataJson;

const postsRouter = express.Router();

postsRouter.delete("/testing/all-data", (req: Request, res: Response) => {
  data = [];

  return res.sendStatus(HttpResponses.NO_CONTENT);
});

postsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const post = data.find((v) => v.id === id);

  if (!post)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Post with id ${id} doesn't exist!`);

  return res.status(HttpResponses.OK).send(post);
});

postsRouter.get("/", (req: Request, res: Response) => {
  res.status(HttpResponses.OK).send(data);
});

postsRouter.post("/", (req: Request, res: Response) => {
  const { title, shortDescription, content, blogId } = req.body as PostPostType;

  // const validationResult = validateBlogBody(req.body, res);
  // if (validationResult) return;

  const newPost = {
    id: String(data.length),
    title,
    shortDescription,
    content,
    blogId,
    blogName: "",
  };

  data.push(newPost);

  return res.status(HttpResponses.CREATED).send(newPost);
});

postsRouter.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const post = data.find((v) => v.id === id);

  // const validationResult = validateVideoBody(req.body, res);
  // if (validationResult) return;

  const { title, shortDescription, content, blogId } = req.body as PutPostType;

  if (!post)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Post with id ${id} doesn't exist!`);

  post.title = title;
  post.shortDescription = shortDescription;
  post.content = content;
  post.blogId = blogId;

  return res.sendStatus(HttpResponses.NO_CONTENT);
});

postsRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const postIndex = data.findIndex((v) => v.id === id);

  if (postIndex === -1) {
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Post with id ${id} doesn't exist!`);
  }

  data.splice(postIndex, 1);

  return res.sendStatus(HttpResponses.NO_CONTENT);
});

export { postsRouter };
