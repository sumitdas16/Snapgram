import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/QueriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {

  const { data: currentUser } = useGetCurrentUser();
  const savePosts = currentUser?.save
  .map((savePost: Models.Document) => ({
    ...savePost.post,
    creator: {
      imageUrl: currentUser.imageUrl,
    },
  }))
  .reverse();
  return (
    <div className="flex flex-1">
      <div className="saved-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/saved.svg" alt="add" height={36} width={36} />

          <p className="h3-bold md:h2-bold text-left w-full">Saved Post</p>
        </div>
        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <div className="flex-center gap-3 bg-dark-3 rounded-xl px-5 py-3 cursor-pointer">
            <img
              src="/assets/icons/posts.svg"
              alt="filter"
              width={20}
              height={20}
            />{" "}
            <p className="small-medium md:base-medium text-light-2">Posts</p>
          </div>

          <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              alt="filter"
              width={20}
              height={20}
            />
          </div>
        </div>

        {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
      </div>
    </div>
  );
};

export default Saved;
