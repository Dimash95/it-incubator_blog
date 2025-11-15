import { Response } from "express";
import { HttpResponses } from "../../const";
import { PostBlogType, PutBlogType } from "./types";

export const validateBlogBody = (
  body: PostBlogType | PutBlogType,
  res: Response
) => {
  const errors: { message: string; field: string }[] = [];

  const { name, description, websiteUrl } = body;

  // NAME
  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push({ field: "name", message: "Name is required" });
  } else if (name.length > 15) {
    errors.push({ field: "name", message: "Name must be ≤ 15 characters" });
  }

  // DESCRIPTION
  if (!description || typeof description !== "string" || !description.trim()) {
    errors.push({ field: "description", message: "Description is required" });
  } else if (description.length > 500) {
    errors.push({
      field: "description",
      message: "Description must be ≤ 500 characters",
    });
  }

  // WEBSITE URL
  if (!websiteUrl || typeof websiteUrl !== "string" || !websiteUrl.trim()) {
    errors.push({ field: "websiteUrl", message: "WebsiteUrl is required" });
  } else if (websiteUrl.length > 100) {
    errors.push({
      field: "websiteUrl",
      message: "WebsiteUrl must be ≤ 100 characters",
    });
  } else {
    // URL VALIDATION
    const pattern = /^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!pattern.test(websiteUrl)) {
      errors.push({
        field: "websiteUrl",
        message: "WebsiteUrl must be a valid HTTPS URL",
      });
    }
  }

  // RETURN ERRORS
  if (errors.length > 0) {
    return res
      .status(HttpResponses.BAD_REQUEST)
      .send({ errorsMessages: errors });
  }

  return false;
};
