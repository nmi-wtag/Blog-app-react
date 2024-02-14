import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogDetails from "components/BlogDetails/BlogDetails";
import Layout from "components/Layout/Layout";
import useBlogs from "hooks/useBlogs";

const Blog = () => {
  const { blogId } = useParams();
  const blogs = useBlogs();
  const blogDetails = blogs?.find((blog) => blog.id == blogId);
  return (
    <Layout>
      <BlogDetails blogDetails={blogDetails} />
    </Layout>
  );
};

export default Blog;