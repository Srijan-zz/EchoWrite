import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { ContainerE as Container,Postcard } from '../component/index'


function AllPost() {

    const [posts, setPosts] = useState([])
    appwriteService.getPosts([]).then((posts)  =>{
        if(posts){
            setPosts(posts.documents)   
        }
    })

    //koi querry nhi pass ki hai getPost me
    //.then if getPosts was success and we get posts
  return (
    <div className='flex  flex-wrap py-8 w-full'>
        <h1 className='text-2xl font-bold ml-8 hover:text-gray-500'>
                                All Posts:
        </h1>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                       
                        <Postcard {...post} />
                    </div>
                
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost