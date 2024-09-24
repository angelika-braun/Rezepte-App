import { useState } from "react";

const ContactUs = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });

  const firstNameHandler = (e) => {
    setUserData({ ...userData, firstName: e.target.value });
  };

  const lastNameHandler = (e) => {
    setUserData({ ...userData, lastName: e.target.value });
  };


  return (
    <form>
      <input type="text" value={userData.firstName} onChange={firstNameHandler}/>
      <input type="text" value={userData.lastName} onChange={lastNameHandler} />
      <textarea name="" id=""></textarea>
      <h2>Your saved first name is - {userData.firstName}</h2>
      <h2>Your saved last name is - {userData.lastName}</h2>

      <div>{JSON.stringify(userData)}</div>
    </form>
  );
};

export default ContactUs;
