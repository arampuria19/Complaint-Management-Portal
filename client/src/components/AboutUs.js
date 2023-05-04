import React, {useEffect} from "react";
import Profile from "./Profile";

const AboutUs = () => {

  useEffect(() => {
    document.title = "Complaint Management Portal - About Us";
  }, [])
  

  return (
    <>
      <div className="row row-cols-1 row-cols-lg-3 mx-1 my-1">
        <Profile
          name={"Akshat Rampuria"}
          role={"Developer"}
          githubLink={"https://github.com/arampuria19"}
          gmailLink={"mailto:20cs02013@iitbbs.ac.in"}
          linkedinLink={"https://www.linkedin.com/in/akshat-rampuria-942552200/"}
          // profilePic={"https://firebasestorage.googleapis.com/v0/b/sikayat-4f7ee.appspot.com/o/harsh.jpg?alt=media&token=f4095413-06b1-4b2b-8e44-8f23c4d6462d"}
          text1={"Third Year | CSE | IIT Bhubaneswar"}
        />
        <Profile
          name={"Amit Kumar Pandit"}
          role={"Developer"}
          githubLink={"https://github.com/amitpandit15"}
          gmailLink={"mailto:20cs01035@iitbbs.ac.in"}
          linkedinLink={"https://www.linkedin.com/in/amit-kumar-pandit-ab9964201/"}
          // profilePic={"https://firebasestorage.googleapis.com/v0/b/sikayat-4f7ee.appspot.com/o/jagdish.jpg?alt=media&token=d50acaca-f66f-4fe1-ab91-10eac83974c0"}
          text1={"Third Year | CSE | IIT Bhubaneswar"}
        />
        <Profile
          name={"Kushagra Khare"}
          role={"Developer"}
          githubLink={"https://github.com/kushagra164"}
          gmailLink={"mailto:20cs02004@iitbbs.ac.in"}
          linkedinLink={"https://www.linkedin.com/in/kushagra-khare-5b76b8215/"}
          // profilePic={"https://firebasestorage.googleapis.com/v0/b/sikayat-4f7ee.appspot.com/o/sushant.webp?alt=media&token=c63b22f7-3dcc-4ee0-bc84-52cd69314d05"}
          text1={"Third Year | CSE | IIT Bhubaneswar"}
        />
      </div>
    </>
  );
};

export default AboutUs;
