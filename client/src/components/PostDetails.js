import React, {useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostItem from "./PostItem";
import Comment from "./Comment";
import postDetailsContext from "../context/postDetails/postDetailsContext";
import loginContext from "../context/login/loginContext";
import Spinner from "./Spinner";

const PostDetails = (props) => {

    const {id} = useParams();
    const contextPostDetails = useContext(postDetailsContext);
    const {post, getPost, loading, setLoading} = contextPostDetails;
    const contextLogin = useContext(loginContext);
    const { isLoggedIn } = contextLogin;
    const navigate = useNavigate();

    useEffect( () => {
        document.title = "Complaint Management Portal - Post Details";
        getPost(id);
        if(isLoggedIn !== "loggedin")
            navigate("/");
        return () => { setLoading(true) }
        //eslint-disable-next-line
    }, []);
    
    return (
        <section className="min-vh-100">
            <div className="row d-flex justify-content-center align-items-center mx-1">
                <div className="col-sm-12 col-md-6 col-lg-4">{loading ? <Spinner /> : <PostItem key={post._id} post={post} />}</div>
                <div className="col-sm-12 col-md-6 col-lg-7 mx-2"><Comment /></div>
            </div>
        </section>
    );
}

export default PostDetails;