import React from 'react';

const BlogsLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <div>
            Blogs Layout is for Blogs page
            { children}
        </div>
    );
};

export default BlogsLayout;