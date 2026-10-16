import React from 'react';
import { getBlogs } from '../service/getBlogs';
import { cacheLife } from 'next/cache';

const Blogspage = async () => {
     'use cache'
    cacheLife('hours')

    const blogs = await getBlogs();

    return (
        <div>

            {
                blogs.map((blog) => (
                    <div key={blog.id}>
                        <h2>{blog.title} </h2>
                        <p>{blog.body}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Blogspage;