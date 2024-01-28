import Card from "../Card";

const Login = () => {
  return (
    <Card text={{header: "Login"}}>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
    </Card>
  );
};

export default Login;