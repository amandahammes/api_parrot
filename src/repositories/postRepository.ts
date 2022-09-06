import { Post } from "../entity/Post";
import { AppDataSource } from "../data-source";

export const postRepository = AppDataSource.getRepository(Post)