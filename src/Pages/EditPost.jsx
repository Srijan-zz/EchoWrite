import React, {useEffect,useState} from 'react'
import { ContainerE as Container, PostForm } from '../component/index'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'



function EditPost() {

    const [posts,SetPosts]= useState(null)
    const  {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    SetPosts(post)
                }
                else{
                    navigate('/')
                }
            })
        }
    },[slug,navigate])


  return posts? (
    <div className='py-8'>
        <Container>
            <PostForm post={posts} />
        </Container>
    </div>
  ) : null
}

export default EditPost