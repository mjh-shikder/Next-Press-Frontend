import React from 'react';

const SlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug} = await params
    
    return (
        <div>
            Slug Page : { slug}
        </div>
    );
};

export default SlugPage;