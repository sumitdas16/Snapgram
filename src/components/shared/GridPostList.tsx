import { useUserContext } from '@/context/AuthContext'
import { PostDetails } from '@/root/pages'
import { Models } from 'appwrite'
import React from 'react'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'

type GridPostListProps = {
  posts :Models.Document[],
  showUser? : boolean,
  showStats? : boolean 
}

const GridPostList = ({posts, showUser = true , showStats = true }: GridPostListProps) => {

  const {user} = useUserContext();
  return (
    <ul className="grid-container">
      {
        posts.map((post) => (
          <li key={post.$id} className='relative min-w-80 h-80'><Link to={`/posts/${post.$id}`} className='grid-post_link'>
            <img src={post.imageUrl} alt="post" className='h-full w-full object-cover'/>
          </Link>

          
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2">
                <img className='h-8 w-8 rounded-full' src={post.creator.imageUrl} alt="creator" />
                <Link to={`/profile/${post.creator.$id}`}><p className='line-clamp-1'>{post.creator.name}</p></Link>
              </div>
            )}

            {showStats && (
              <PostStats post={post} userId={post.creator.$id}/>
            )}
          </div>
          </li>
        ))
      }
    </ul>
  )
}

export default GridPostList
