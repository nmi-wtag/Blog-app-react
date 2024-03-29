import AuthForm from "components/AuthForm/AuthForm";
import { useDispatch } from "react-redux";
import { loggedInUser } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout/Layout";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(loggedInUser({ user: values, navigate: navigate }));
  };

  return (
    <Layout>
      <h1>Login</h1>

      <AuthForm handleSubmit={handleSubmit} />
    </Layout>
  );
};

export default Login;
