import React, {useEffect,useState} from 'react'
import appwriteService from '../appwrite/config'
import {ContainerE as Container, Postcard} from '../component/index'
import PostCard from '../component/Postcard'
import { useSelector } from 'react-redux'


function Home() {

    const [posts,setPosts]= useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[userData])


    if(!userData){
        return(
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


    if(posts.length === 0){
        return(
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

    return(
        <div className='w-full py-8'>
            <h1 className='text-2xl font-bold ml-8 hover:text-gray-500'>
                                Posts Made By You:
            </h1>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        
                        
                        posts
                        .filter((post)=> post.userId==userData?.$id)
                        .map((post)=>{
                            
                            
                            return(
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