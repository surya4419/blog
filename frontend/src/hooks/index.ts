import { useEffect,  useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";


export interface Blog{
    "content": string;
    "title":string;
    "id": string;
    "author":{
        "name":string
    }
}

export const useBlog = ({id}: {id: string}) =>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/user/${id}`, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
            
        }).then(response => {
            setBlog(response.data.post);
            console.log(response.data);
            setLoading(false);
            
        }).catch(error =>{
            console.error("error fetching blog", error)
            console.log(error);
            setLoading(false);
        })
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
            
        }).then(response => {
            setBlogs(response.data.posts);
            console.log(response.data);
            setLoading(false);
            
        }).catch(error =>{
            console.error("error fetching blogs", error)
            console.log(error);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
}