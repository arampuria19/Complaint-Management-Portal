import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import CommentItem from './CommentItem';
import commentContext from "./../context/comment/commentContext";
import Spinner from './Spinner';
import AddNewComment from './AddNewComment';

const Comment = () => {

    const contextComment = useContext(commentContext);
    const { comments, getComments, loading, totalComments, resetToDefaultState } = contextComment;

    const {id} = useParams();

    useEffect(() => {
      getComments(id);
      return () => {resetToDefaultState()};
      //eslint-disable-next-line
    }, [])
    

    return (
        <div className="col" style={{ height: "100vh"  }} >
            <AddNewComment />
            <div  className='card card-shadow overflow-auto' style={{height: "70vh"}} >
                {
                    loading? <Spinner/> : (
                        totalComments===0 ? <p className='text-muted my-4' style={{ textAlign: 'center' }}>No comments</p> :
                        comments.map( (comment)=>{
                            return(
                                <CommentItem key={comment._id} comment={comment} />
                            )
                        } ) 
                    )
                }
            </div>
        </div>
    )
}

export default Comment;