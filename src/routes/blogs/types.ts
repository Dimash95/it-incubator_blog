export type BlogType = {
  id: string;
  name: string; // 15
  description: string; // 500
  websiteUrl: string; // 100
};

export type PostBlogType = {
  name: string;
  description: string;
  websiteUrl: string;
};

export type PutBlogType = {
  name: string;
  description: string;
  websiteUrl: string;
};
