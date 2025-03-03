import React, { useState } from "react";
import CommentPopup from "./CommentPopup";
import { apiResponse } from "../../../Interfaces";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentByProductQuery,
} from "../../../Apis/CommentApi";
import { MiniLoader } from "../Common";
import { useSelector } from "react-redux";

interface Props {
  product: any;
}

function ProductComments(props: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [postComment] = useCreateCommentMutation();
  const [removeComment] = useDeleteCommentMutation();
  const { data, isLoading } = useGetCommentByProductQuery(props.product.id);

  const loggedInUserName = useSelector(
    (state: any) => state.userAuthStore?.fullName
  );

  const handleCommentSubmit = async (comment: string, rating: number) => {
    const response: apiResponse = await postComment({
      content: comment,
      productId: props.product.id,
      rating: rating,
    });
  };

  const handleDeleteComment = async (commentId: number) => {
    const response: apiResponse = await removeComment(commentId);
  };

  if (isLoading) {
    return <MiniLoader />;
  }

  return (
    <div className="container">
      <div className="row m-2 p-2 justify-content-md-center">
        <div className="col-8">
          <h4 className="mt-5 text-center">Comments</h4>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary"
              onClick={() => setShowPopup(true)}
            >
              Leave a Comment
            </button>
          </div>
          {isLoading ? (
            <p className="mt-5 text-center">Loading comments...</p>
          ) : data?.result?.length === 0 ? (
            <p className="mt-5 text-center">No Comments Yet</p>
          ) : (
            <ul className="list-group mt-3">
              {data?.result?.map((comment: any) => (
                <li key={comment.id} className="list-group-item">
                  <p>
                    <strong>{comment.userName}</strong> - ⭐ {comment.rating}
                    /5
                  </p>
                  <p>{comment.content}</p>
                  <small className="text-muted">
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                  {comment.userName === loggedInUserName && (
                    <button
                      className="btn btn-danger btn-sm mt-2 ms-5"
                      // onClick={() => handleDeleteComment(comment.commentId)}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to remove this comment?"
                          )
                        ) {
                          handleDeleteComment(comment.commentId);
                        }
                      }}
                    >
                      Remove Your Comment
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {showPopup && (
        <CommentPopup
          show={showPopup}
          handleClose={() => setShowPopup(false)}
          handleSubmit={handleCommentSubmit}
        />
      )}
    </div>
  );
}

export default ProductComments;
