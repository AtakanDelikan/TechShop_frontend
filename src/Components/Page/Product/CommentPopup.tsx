import React, { useState } from "react";

interface CommentPopupProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (comment: string, rating: number) => void;
}

const CommentPopup: React.FC<CommentPopupProps> = ({
  show,
  handleClose,
  handleSubmit,
}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(0);

  const onSubmit = () => {
    if (!comment || rating === 0) return; // Prevent empty submission
    handleSubmit(comment, rating);
    setComment("");
    setRating(0);
    handleClose(); // Close the modal after submission
  };

  return show ? (
    <>
      {/* Backdrop - clicking it closes the modal */}
      <div
        className="modal-backdrop fade show"
        onClick={handleClose} // Closes on backdrop click
      ></div>

      {/* Centered Modal */}
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">Write a Comment</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your thoughts..."
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rating</label>
                <div className="d-flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div className="form-check me-2" key={star}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        value={star}
                        checked={rating === star}
                        onChange={() => setRating(star)}
                        id={`star${star}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`star${star}`}
                      >
                        {star} ⭐
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={onSubmit}
                disabled={!comment || rating === 0} // Disable if empty
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default CommentPopup;
