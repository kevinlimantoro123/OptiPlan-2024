import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <section>
      <h1>Your account has been successfully created!</h1>
      <button onClick={() => navigate(-1)}>Go back</button>
    </section>
  );
};

export default Success;
