import express, { Request, Response } from "express";
import { BlogType } from "../blogs/types";
import { PostType } from "../posts/types";

import blogsJson from "../../blogsData.json";
import postsJson from "../../postsData.json";

import { HttpResponses } from "../../const";

let blogsData: BlogType[] = blogsJson;
let postsData: PostType[] = postsJson;

const dropRouter = express.Router();

dropRouter.delete("/", (req: Request, res: Response) => {
  blogsData = [];
  postsData = [];

  return res.sendStatus(HttpResponses.NO_CONTENT);
});

export { dropRouter };
