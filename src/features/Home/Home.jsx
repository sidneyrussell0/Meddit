//Home Page
//STILL WORKING ON
import React, { useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComments } from '../comment/commentSlice';
import { fetchAllPosts } from '../post/postSlice';
import { fetchAllSubmeddits } from '../submeddits/submedditSlice';
/*import CreatePost from '../post/CreatePost';*/
import PostThread from '../post/PostThread';


const Home = () => {
  const dispatch = useDispatch();
  const { comment, loading: commentLoading, error: commentError, success: commentSuccess } = useSelector((state) => state.commentReducer);
  const { post, loading: postLoading, error: postError, success: postSuccess } = useSelector((state) => state.postReducer);
  const { submeddit, loading: submedditloading, error: submedditError, success: submedditSuccess } = useSelector((state) => state.submedditReducer);

  //Fetch data types 
  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllComments());
    dispatch(fetchAllSubmeddits());
  }, [dispatch]);

  return (
      <div className='home-container'>
        <h2 className='section-title'>Latest Posts</h2>
        {postLoading && <p>Loading posts...</p>}
        {postError && <p>Error: {postError}</p>}
        {post && post.length > 0 ? (
          <PostThread post={post} />
        ) : (
          !postLoading && <p>No posts found.</p>
        )}
      </div>
  );
};

export default Home;