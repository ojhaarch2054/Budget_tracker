import { useNavigate } from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();

  const profileBtn = () => {
    console.log("profile page");
    navigate('/profile');
  };
  return (
    <div className="d-flex justify-content-center">
      <button onClick={profileBtn} className="btn profileBtn w-25 mb-5">
        View Profile
      </button>
    </div>
  );
};

export default Profile;
