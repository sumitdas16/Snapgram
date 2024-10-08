import {
    useQuery,
    useMutation, useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query"
import { createUserAccount, signInAccount, signOutAccount , createPost, getRecentPosts, likePost, savePost, deleteSavedPost, getCurrentuser, getPostById, updatePost, deletePost, getInfinitePosts, searchPosts, getUserById, getUsers, getUserPosts, updateUser } from "../appwrite/api"
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types"
import { QUERY_KEYS } from "./QueryKeys"


export const useCreateUserAccount = ()=>{
    return useMutation({
        mutationFn : (user : INewUser) => createUserAccount(user)
    })
}
export const useSignInAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        signInAccount(user),
    });
};
export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount,
    });
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey : [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn : getRecentPosts,
  })
}

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts as any,
    getNextPageParam: (lastPage: any) => {
      // Ensure lastPage is defined and has documents before proceeding
      if (!lastPage || !lastPage.documents || lastPage.documents.length === 0) {
        return null; // No more pages to fetch
      }

      // Use the $id of the last document as the cursor
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
    initialPageParam: 1, // Set the initial page or cursor param
  });
};



export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : ({postId , likesArray} : {postId : string, likesArray:string[]}) => likePost(postId,likesArray),

    onSuccess : (data) => {
      queryClient.invalidateQueries({
        queryKey : [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
      queryClient.invalidateQueries({
        queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey : [QUERY_KEYS.GET_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey : [QUERY_KEYS.GET_CURRENT_USER]
      })
      
    }
  })
}

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : ({postId , userId} : {postId : string, userId :string}) => savePost(postId , userId),

    onSuccess : () => {
       queryClient.invalidateQueries({
        queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey : [QUERY_KEYS.GET_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey : [QUERY_KEYS.GET_CURRENT_USER]
      })
      
    }
  })
}

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : (saveRecordId : string) => deleteSavedPost(saveRecordId),

    onSuccess : () => {
       queryClient.invalidateQueries({
        queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey : [QUERY_KEYS.GET_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey : [QUERY_KEYS.GET_CURRENT_USER]
      })
      
    }
  })
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn : getCurrentuser,
  })
}

export const useGetPostById = (postId : string) => {
  return useQuery({
    queryKey : [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn : () => getPostById(postId),
    enabled : !!postId
  })
}
export const useUpdatePost = () => {

  const queryClient = useQueryClient();
  return useMutation({
      mutationFn : (post : IUpdatePost) => updatePost(post),
      onSuccess : (data) => {
        queryClient.invalidateQueries({
          queryKey : [QUERY_KEYS.GET_POST_BY_ID , data?.$id]
        })
      }
  })
}

export const useDeletePost = () => {

  const queryClient = useQueryClient();
  return useMutation({
      mutationFn : ({postId , imageId} : {postId : string , imageId : string}) => deletePost(postId, imageId),
      onSuccess : () => {
        queryClient.invalidateQueries({
          queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
        })
      }
  })
}


export const useSearchPost = (searchTerm : string) => {
  return useQuery({
    queryKey : [QUERY_KEYS.SEARCH_POSTS , searchTerm],
    queryFn : () => searchPosts(searchTerm),
    enabled : !!searchTerm
  })
}

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });
};

export const useGetUserPosts = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};