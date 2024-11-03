import React, { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { fb } from "../assets/icons/fb.png";
import { insta } from "../assets/icons/insta.png";
import sms from "../assets/icons/sms.png";
import { twitter } from "../assets/icons/twitter.png";
import { FaMailBulk } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TextField, Button } from "@mui/material";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase/setup";
import { signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";

function Contact() {
  const [mobileNumber, setMobileNumber] = useState();
  const [flag, setFlag] = useState(true);
  const [OTP, setOTP] = useState();
  const [otpRecieved, setOtpRecieved] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [userData, setuserData] = useState({
    name: "",
    email: "",
    desc: "",
    phoneNumber: "+91" + mobileNumber,
  });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleOnChange = (e) => {
    if (e.target.name == "phoneNumber") {
      hanldeMobileNumber(e);
    }
    if (e.target.name == "name") {
      if (e.target.value.length < 5) {
        setNameError(
          "Plase Enter Valid Name, Name should be of atleast 5 letters"
        );
      } else {
        setNameError("");
      }
    }
    if (e.target.name === "email") {
      if (validator.isEmail(e.target.value)) {
        setEmailError("");
        setFlag(false);
      } else {
        setEmailError("Please enter valid Email");
        setFlag(true);
        if (mobileNumber?.length < 10) {
          setFlag(true);
        }
      }
    }
    const { name, value } = e.target;
    setuserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitUserDetails = async () => {
    try {
      console.log("User Details==>", {
        ...userData,
        phoneNumber: "+91" + userData.phoneNumber,
      });

      const payload = {
        ...userData,
        phoneNumber: "+91" + userData.phoneNumber,
      };
      console.log(payload);
      // const jsonUserData = await fetch(
      //   "http://localhost:3000/api/userContactDetails",
      //   {
      //     method: "post",
      //     headers: {
      //       "content-type": "application/json",
      //     },

      //     body: JSON.stringify(payload),
      //   }
      // );
      const jsonUserData = await fetch(
        "https://userdetailstwiliomongoosenodejsserver-hq90lb7s.b4a.run/api/userContactDetails",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const responseData = await jsonUserData.json();

      console.log("api result", responseData);

      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/");
      }
      if (!responseData.success) {
        toast.error(responseData.message);
        //navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyMobileNumber = async () => {
    try {
      const recaptch = new RecaptchaVerifier(auth, "recaptcha", {});
      const configuration = await signInWithPhoneNumber(
        auth,
        "+91" + mobileNumber,
        recaptch
      );
      console.log(mobileNumber);
      console.log(configuration);
      setUser(configuration);
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeMobileNumber = (e) => {
    if (e.target.value.length > 10) {
      alert(
        "Please try entering valid Mobile Number, Should not exceed 10 numbers",
        console.log(mobileNumber.length)
      );
      setPhoneError(
        "Please try entering valid Mobile Number, Should not exceed 10 numbers"
      );
      setPhoneError(
        "Please try entering valid Mobile Number, Should not exceed 10 numbers"
      );
      setFlag(true);
      //setMobileNumber(null);
    } else {
      setMobileNumber(e.target.value);
      setFlag(true);
    }
    if (e.target?.value.length == 10) {
      if (emailError?.length === 0) {
        setFlag(false);
        setEmailError("");
        setPhoneError("");
      }
    }
    if (e.target?.value.length < 10) {
      setPhoneError(
        "Please try entering valid Mobile Number, Should not exceed 10 numbers"
      );
    }
  };

  const handleOTP = (e) => {
    if (e.target.value.length > 6) {
    } else {
      setOTP(e.target.value);
    }
  };
  return (
    <section
      id="contact"
      className="w-full bg-slate-200 flex flex-col lg:flex-row gap-5  justify-center"
    >
      <div className="flex justify-center items-center w-full lg:w-3/4 flex-col lg:flex-row bg-white rounded-lg px-8 lg:m-1  gap-5 z-20">
        <div className="flex justify-center items-start flex-col gap-4 w-full">
          <h1 className="text-green-600 font-bold text-[25px]">
            Contact Information
          </h1>

          <div
            id="phone"
            className="flex justify-center items-center gap-4 text-lg font-semibold text-gray-600"
          >
            <span className="bg-green-400 p-3 rounded-full">
              <FaPhone />
            </span>
            +91 9333026364
          </div>

          <div
            id="email"
            className="flex justify-center items-center gap-4 
             font-semibold text-gray-600"
          >
            <span className="bg-green-400 p-3 rounded-full text">
              <FaMailBulk />
            </span>
            admin@pgtechnoservices.com
          </div>

          <div
            id="address"
            className="flex justify-center items-center gap-4 text-lg font-semibold text-gray-600"
          >
            <span className="bg-green-400 p-3 rounded-full">
              <FaMapMarkerAlt />
            </span>
            Bangalore,Karnataka,India-560040
          </div>

          <div
            id="logos"
            className="flex justify-center 
            items-center gap-4 mx-2 mt-5"
          >
            <span className="bg-green-500 rounded-full cursor-pointer hover:bg-green-600 text-2xl">
              <FaFacebook />
            </span>

            <span className="bg-green-500 rounded-full cursor-pointer hover:bg-green-600 text-2xl">
              <FaInstagramSquare />
            </span>

            <span className="bg-green-500 rounded-full cursor-pointer hover:bg-green-600 text-2xl">
              <FaTwitterSquare />
            </span>

            <span className="bg-green-500 rounded-full cursor-pointer hover:bg-green-600 text-2xl">
              <FaYoutubeSquare />
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center  gap-2 w-full lg:py-10">
          <div className="flex flex-row w-full gap-2">
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={userData.name}
              onChange={handleOnChange}
              className="px-4 py-4 border-2 border-green-500 rounded-lg text-[18px] bg-slate-100 focus:outline-none w-full focus:border-green-800"
            ></input>
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {nameError}
            </span>
          </div>

          <div className="flex flex-row w-full gap-2">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="px-4 py-4 border-2 border-green-500 rounded-lg text-[18px] bg-slate-100 focus:outline-none w-full focus:border-green-800"
            ></input>
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {emailError}
            </span>
          </div>

          <div className="flex flex-row w-fit">
            {/* <PhoneInput
              country={"in"}
              value={mobileNumber}
              onChange={(phone) => setMobileNumber({ phone })}
            /> */}
            {/* <PhoneInput
              country={"in"}
              className="w-full h-[35px]"
              placeholder="Enter 10 Digit Mobile Number"
              containerStyle={{ width: "600px" }}
            />
            <Button
              variant="contained"
              sx={{ marginLeft: "0px" }}
              className="bg-orange-500   w-[200px]"
            >
              Verify Mobile
            </Button> */}
          </div>
          {/* <div>
            <TextField
              variant="outlined"
              label="Enter OTP"
              className="w-full"
              size="medium"
            ></TextField>
          </div> */}

          <div className=" flex gap-2 w-full">
            <input
              type="number"
              placeholder="Enter 10 digit moible number"
              maxLength={10}
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleOnChange}
              className={`px-4 py-4 border-2 ${
                mobileNumber?.length > 10
                  ? "border-red-600"
                  : "border-green-500"
              }  rounded-lg text-[18px] bg-slate-100 focus:outline-none w-full ${
                flag ? "focus:border-red-400" : "focus:border-green-800"
              } `}
            ></input>
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {phoneError}
            </span>
            {/* <button
              className="bg-orange-500 w-full"
              onClick={verifyMobileNumber}
            >
              Verify Mobile
            </button> */}
          </div>
          {/* <div id="recaptcha" className="mt-5"></div> */}
          {/* {otpRecieved && (
            <div className="flex flex-row w-full gap-2">
              <input
                maxLength={6}
                value={OTP}
                onChange={handleOTP}
                type="number"
                placeholder="Enter OTP"
                className="px-4 py-4 border-2 border-green-500 rounded-lg text-[18px] bg-slate-100 focus:outline-none w-full focus:border-green-800"
              ></input>
              <button className="bg-orange-500 w-full">Verify OTP</button>
            </div>
          )} */}

          <textarea
            className="px-4 py-4 border-2 border-green-500 rounded-lg text-[18px] bg-slate-100 focus:outline-none w-full focus:border-green-800"
            cols={30}
            rows={5}
            name="desc"
            value={userData.desc}
            onChange={handleOnChange}
            placeholder="Enter your message, including your requiements related to technology services or corporate training"
          ></textarea>
          {mobileNumber?.length === 10 && flag === false ? (
            <button
              className="bg-green-700 text-white px-4 py-3 w-2/3 rounded-lg "
              disabled={false}
              onClick={submitUserDetails}
            >
              SUBMIT
            </button>
          ) : (
            <button
              className="bg-gray-400 text-white px-4 py-3 w-2/3 rounded-lg "
              disabled={true}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
