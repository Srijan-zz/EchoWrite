import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {ContainerE as Container} from '../index'
let previewFile = ""
let strippedUrl = ""



function PostForm({ post }) {
      const userData = useSelector(state => state.auth.userData)
    const [isUserReady, setIsUserReady] = useState(false);

    if (post) {
        previewFile = appwriteService.getFilePrevie(post.featuredImage)
        strippedUrl = previewFile.split("://")[1]
    }

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || ''
        }
    })


    const navigate = useNavigate()
  

    
useEffect(() => {
    if (userData && userData.$id) {
        setIsUserReady(true);
    }
}, [userData]);


    if(!isUserReady){
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl ml-8 font-bold hover:text-gray-500'>
                                Loading.....
                            </h1>
                        </div>

                    </div>
                </Container>
            </div>
        )
    }



    const submit = async (data) => {

        console.log(userData);

        if (post) { //mtlb update krna hai
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                appwriteService.deletePost(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }

        else {


            const file = await appwriteService.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                console.log(`${userData.$id}`);

                const dbpost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                })

                if (dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof (value) === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }

        return ''
    })

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })


        return () =>
            subscription.unsubscribe()

    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });

                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>


            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                
                {post && (
                    <div className="w-full mb-4">
                        {
                            console.log(strippedUrl)
                            
                        }
                        <img
                            src={strippedUrl}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status : "
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className=" active:bg-black w-full mt-5" >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm