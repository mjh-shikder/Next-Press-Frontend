import React from 'react';
import { getBlogs } from '../service/getBlogs';

const Blogspage = async() => {

    const blogs = await getBlogs()

    return (
        <div>
            Blog page
        </div>
    );
};

export default Blogspage;