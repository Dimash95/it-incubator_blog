import { body } from "express-validator";

export const postValidation = [
  body("shortDescription")
    .trim()
    .isString()
    .withMessage("ShortDescription must be a string")
    .isLength({ min: 1 })
    .withMessage("ShortDescription is required")
    .isLength({ max: 100 })
    .withMessage("ShortDescription must be ≤ 100 characters"),

  body("title")
    .trim()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 1 })
    .withMessage("Title is required")
    .isLength({ max: 30 })
    .withMessage("Title must be ≤ 30 characters"),

  body("content")
    .trim()
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 1 })
    .withMessage("Content is required")
    .isLength({ max: 1000 })
    .withMessage("Content must be ≤ 1000 characters"),

  body("blogId")
    .isString()
    .withMessage("BlogId must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("BlogId is required"),
];
