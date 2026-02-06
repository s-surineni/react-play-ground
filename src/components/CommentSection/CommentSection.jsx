import React, { useState, useEffect } from 'react';
import './CommentSection.css';

const COMMENTS_URL = 'https://dummyjson.com/posts/1/comments?limit=3';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editBody, setEditBody] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(COMMENTS_URL);
        if (!res.ok) throw new Error('Failed to fetch comments');
        const data = await res.json();
        setComments(data.comments ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditBody(comment.body);
  };

  const saveEdit = () => {
    if (editingId == null) return;
    setComments((prev) =>
      prev.map((c) =>
        c.id === editingId ? { ...c, body: editBody } : c
      )
    );
    setEditingId(null);
    setEditBody('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditBody('');
  };

  if (loading) return <div className="comment-section comment-section--loading">Loading comments…</div>;
  if (error) return <div className="comment-section comment-section--error">Error: {error}</div>;

  return (
    <div className="demo-section">
      <h2 className="demo-title">Comments</h2>
      <section className="comment-section" aria-label="Comment section">
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              {editingId === comment.id ? (
                <div className="comment-edit">
                  <textarea
                    className="comment-edit__input"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    aria-label="Edit comment"
                    rows={3}
                  />
                  <div className="comment-edit__actions">
                    <button
                      type="button"
                      className="comment-edit__save"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="comment-edit__cancel"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="comment-view"
                  onClick={() => startEdit(comment)}
                >
                  <span className="comment-view__body">{comment.body}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CommentSection;

/*
While working on the website for a blog you decide to add a simple comment section. This comment section will allow users to make comments on posts, and edit those comments.

The requirements for the comment feature are:
- When run, the page should load 3 comments. The ability to load more than 3 comments is not required at this time.
- Users can click on a comment to open the edit feature.
- In edit mode, there is a "Save" button to the right of the comment.
- Clicking "Save" should return the comment to view mode with the edits applied.

This endpoint can be used to fetch comments for a blog post to test your development: https://dummyjson.com/posts/1/comments?limit=3. Each comment has the following structure:
{
  "comments": [
    {
      "id": 1,
      "userId": 2,
      "body": "This is a comment."
    }
  ]
}
*/
// console.log("hi")