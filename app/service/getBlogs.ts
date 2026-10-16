export const getBlogs = async () => { 
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts");

    const postData = await posts.json();

    console.log(postData);
    
}


