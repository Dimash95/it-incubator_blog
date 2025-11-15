import { Response } from "express";
import { HttpResponses } from "../../const";
import { PostPostType, PutPostType } from "./types";

export const validatePostBody = (
  body: PostPostType | PutPostType,
  res: Response
) => {
  const errors: { message: string; field: string }[] = [];

  const { title, shortDescription, content, blogId } = body;

  // TITLE
  if (!title || typeof title !== "string" || !title.trim()) {
    errors.push({ field: "title", message: "Title is required" });
  } else if (title.length > 30) {
    errors.push({
      field: "title",
      message: "Title must be ≤ 30 characters",
    });
  }

  // SHORT DESCRIPTION
  if (
    !shortDescription ||
    typeof shortDescription !== "string" ||
    !shortDescription.trim()
  ) {
    errors.push({
      field: "shortDescription",
      message: "ShortDescription is required",
    });
  } else if (shortDescription.length > 100) {
    errors.push({
      field: "shortDescription",
      message: "ShortDescription must be ≤ 100 characters",
    });
  }

  // CONTENT
  if (!content || typeof content !== "string" || !content.trim()) {
    errors.push({ field: "content", message: "Content is required" });
  } else if (content.length > 1000) {
    errors.push({
      field: "content",
      message: "Content must be ≤ 1000 characters",
    });
  }

  // BLOG ID
  if (!blogId || typeof blogId !== "string") {
    errors.push({
      field: "blogId",
      message: "BlogId is required",
    });
  }

  // RETURN IF ERRORS
  if (errors.length > 0) {
    return res.status(HttpResponses.BAD_REQUEST).send({
      errorsMessages: errors,
    });
  }

  return false;
};
