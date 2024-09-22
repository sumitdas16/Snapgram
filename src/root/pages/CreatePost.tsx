import PostForm from "@/components/forms/PostForm"

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/add-post.svg" alt="add" height={36} width={36} />

          <p className="h3-bold md:h2-bold text-left w-full">Create Post</p>
        </div>


        <PostForm/>
      </div>
    </div>
  )
}

export default CreatePost