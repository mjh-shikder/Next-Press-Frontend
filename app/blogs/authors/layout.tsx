import React from 'react';

const AuthorLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <div>
            authors layout 
            { children}
        </div>
    );
};

export default AuthorLayout;