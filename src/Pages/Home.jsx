import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { ContainerE as Container, Postcard } from '../component/index'
import PostCard from '../component/PostCard'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'


function Home() {

    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);
    const location=useLocation();

    useEffect(() => {
        console.log(userData);

        if (userData) {
            console.log("user exists");
            
            appwriteService.getUserPosts(userData.$id).then((posts) => {
                console.log(posts);
                
                if (posts) {
                    setPosts(posts.documents)
                }
            
            })
        }
        
    }, [userData, location.state?.refresh])

    if (!userData) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl ml-8 font-bold hover:text-gray-500'>
                                Login/Signup to view your posts
                            </h1>
                        </div>

                    </div>
                </Container>
            </div>
        )
    }


    if (!posts.length) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl ml-8 font-bold hover:text-gray-500'>
                                No Posts
                            </h1>
                        </div>

                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <h1 className='text-2xl font-bold ml-8 hover:text-gray-500'>
                Posts Made By You:
            </h1>
            <Container>
                <div className='flex flex-wrap'>
                    {


                        posts
                            .filter((post) => post.userId == userData?.$id)
                            .map((post) => {


                                return (
                                    <div className='p-2 w-1/4 ' key={post.$id}>
                                        {/* <PostCard post={post} /> */}
                                        <PostCard {...post} />
                                    </div>
                                )

                            }
                            )
                    }

                </div>
            </Container>
        </div>
    )
}

export default Home
