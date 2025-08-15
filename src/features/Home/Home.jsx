//Home Page
//STILL WORKING ON
import React, { useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComments } from '../features/comments/commentsSlice';
import { fetchAllPosts } from '../features/posts/postsSlice';
import { fetchAllSubmeddits } from '../features/submeddits/submedditsSlice';
import CreatePost from '../features/posts/CreatePost';
import PostThread from '../features/posts/PostThread';


const Home = () => {
  const dispatch = useDispatch();
  const { comments, loading: commentsLoading, error: commentsError, success: commentsSuccess } = useSelector((state) => state.comments);
  const { posts, loading: postsLoading, error: postsError, success: postsSuccess } = useSelector((state) => state.posts);
  const { submeddit, loading: submedditsloading, error: submedditsError, success: submedditsSuccess } = useSelector((state) => state.submeddit);

  //Fetch data types 
  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllComments());
    dispatch(fetchAllSubmeddits());
  }, [dispatch]);

  return (
      <div className='home-container'>
        <h2 className='section-title'>Latest Posts</h2>
        {postsLoading && <p>Loading posts...</p>}
        {postsError && <p>Error: {postsError}</p>}
        {posts && posts.length > 0 ? (
          <PostThread posts={posts} />
        ) : (
          !postsLoading && <p>No posts found.</p>
        )}
      </div>
  );
};

export default Home;