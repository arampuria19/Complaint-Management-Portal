import React, { useContext, useEffect } from "react";
import PostItem from "./PostItem";
import postContext from "../context/post/postContext";
import InfiniteScroll from "react-infinite-scroll-component"
import {Link} from "react-router-dom";
import Spinner from "./Spinner"

const Post = () => {

  const contextPost = useContext(postContext);
  const { posts, getPosts, totalPosts,  resetToDefaultState, filter } = contextPost;

  useEffect(() => {
    document.title = "Complaint Management Portal - Home";
    getPosts();
    return () => {resetToDefaultState()};
    //eslint-disable-next-line
  }, [filter])


  return (
    <InfiniteScroll
      dataLength={posts.length} //This is important field to render the next data
      next={getPosts}
      hasMore={posts.length !== totalPosts}
      loader={<Spinner />}
      endMessage={
        <p className="lead my-4" style={{ textAlign: 'center' }}>
          Yayy! You have seen it all!!!
        </p>
      }
      scrollThreshold ={0.8}
    >
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mx-2 my-1">
        {
          posts.map((post) => {
            return (
              <Link key={post._id} to={`/postdetails/${post._id}`} style={{ color:"inherit", textDecoration:"inherit" }}>
                <PostItem key={post._id} post={post} />
              </Link>
            );
          })
        }
      </div>
    </InfiniteScroll>




  );
};

export default Post;
