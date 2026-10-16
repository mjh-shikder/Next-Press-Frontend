import React from 'react';
import { getBlogs } from '../service/getBlogs';

const Blogspage = async() => {

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