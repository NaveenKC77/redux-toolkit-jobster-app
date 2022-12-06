import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { updateUser } from "../features/user/userSlice";
export const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);
  const [userData, setUserData] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    location: user?.location || "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, location, lastName, email } = userData;
    if (!name || !location || !lastName || !email) {
      toast.error("Please input all fields");
      return;
    }
    dispatch(updateUser(userData));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {/*  type, name, value, handleChange, labelText */}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
            labelText="name"
          ></FormRow>
          <FormRow
            type="text"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
            labelText="Last Name"
          ></FormRow>
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
            labelText="Email"
          ></FormRow>
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
            labelText="location"
          ></FormRow>

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {!isLoading ? "Save Changes" : "Wait"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
