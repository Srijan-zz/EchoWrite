import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, ContainerE as Container } from "../component/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    //author h agr post aur userdata dono availablr h and post and userdata donon ki id same h

    console.log(
        "userData ki id: ",userData?.$id,
        "post ki id: ", post?.userId
    )

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        console.log("deleted0");
        appwriteService.deletePost(post.$id).then((status) => {
            // if (status) {
                console.log("deleted1");
                appwriteService.deleteFile(post.featuredImage).then((status2)=>{
                    console.log("deleted2");
                    // if(status2)
                        navigate("/all-posts");
                }).catch(console.error)
                
            // }?
        }).catch(console.error)
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePrevie(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)} 
                    {/* html milti h content me use parse krdo */}
                    </div>
            </Container>
        </div>
    ) : null;
}