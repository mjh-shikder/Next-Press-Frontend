import { cacheLife } from "next/cache";

export type Blog = {
    id: number | string;
    title: string;
    body: string;
};

export const getBlogs = async (): Promise<Blog[]> => {
    'use cache'
    cacheLife('hours')
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
    }

    const postData: Blog[] = await response.json();
    return postData;
}

