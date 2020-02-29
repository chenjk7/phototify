import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import store from "../../Redux/store";
import PhotoComment from "./photoComment";

class PhotoComments extends Component {
  constructor(props) {
    super(props);
    console.log("comment ->", this.props.comments);

    this.state = {
      comments: [],
      userComment: "",
      commentActionsContainer: "PhotoComments-comment-action-hidden",
      commentActions:
        "btn btn-primary ml-2 disabled PhotoComments-comment-action-submit"
    };
  }
  componentDidMount() {
    autosize(document.getElementById("comment"));
  }
  componentWillMount() {
    // this.getComments();
  }
  componentDidUpdate() {
    // this.setState({ comments: this.props.comments });
  }
  clearComment = () => {
    this.setState({ ["userComment"]: "" });
  };
  onPostComment = e => {
    e.preventDefault();
    const result = this.props.postComment(
      this.state.userComment,
      this.clearComment
    );
  };
  getComments() {
    const { photoId } = this.props;
    console.log("photoId ", photoId);

    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    let token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    axios
      .get(`/api/photoComment/?photoId=${photoId}`, config)
      .then(res => {
        this.setState({ comments: res.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onTACancel = e => {
    e.preventDefault();
    this.clearComment();
    this.setState({
      commentActionsContainer: "PhotoComments-comment-action-hidden"
    });
  };
  onTAFocusOut = () => {
    console.log("on focus out");
    if (this.state.userComment) {
      this.setState({
        commentActionsContainer: "PhotoComments-comment-action"
      });
    } else {
      this.setState({
        commentActionsContainer: "PhotoComments-comment-action-hidden"
      });
    }
  };

  onTAChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      commentActionsContainer: "PhotoComments-comment-action"
    });
    if (e.target.value) {
      this.setState({
        commentActions:
          // "btn btn-outline-danger PhotoComments-comment-action-cancel"
          "btn btn-primary ml-2 PhotoComments-comment-action-submit"
      });
    } else {
      this.setState({
        commentActions:
          "btn btn-primary ml-2 disabled PhotoComments-comment-action-submit"
        // "btn btn-outline-danger disabled PhotoComments-comment-action-cancel"
      });
    }
  };
  render() {
    const { user } = this.props;
    const { comments } = this.props;

    return (
      <div className="PhotoComments-container">
        <h4>Comments</h4>
        <div className="PhotoComments-line PhotoComments-line-inputlayout">
          <img className="user-avatar" src={user.picture} alt="" />
          <div className="PhotoComments-line-input">
            <textarea
              onBlur={this.onTAFocusOut}
              onChange={this.onTAChange}
              className="PhotoComments-line-inputtext"
              type="text"
              value={this.state.userComment}
              placeholder="Add a comment"
              name="userComment"
              id="comment"
            />
            <i className="far fa-comment fa-2x PhotoComments-icon"></i>
          </div>
        </div>
        <div className={this.state.commentActionsContainer}>
          <button
            onClick={this.onTACancel}
            type="button"
            className="btn btn-outline-danger PhotoComments-comment-action-cancel"
          >
            Cancel
          </button>
          <button
            onClick={this.onPostComment}
            type="button"
            className={this.state.commentActions}
          >
            Comment
          </button>
        </div>
        <div>
          {comments.map(comment => (
            <PhotoComment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    );
  }
}

PhotoComments.propTypes = {};
const mapStateToProp = (state, ownProps) => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProp)(PhotoComments);
