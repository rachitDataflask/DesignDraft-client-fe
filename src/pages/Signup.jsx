import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import BackArrowIcon from "../icons/BackArrowIcon";
import EyeIcon from "../icons/EyeIcon";
import EyeCloseIcon from "../icons/EyeCloseIcon";
import { useSignupMutation } from "../redux/features/api/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ email: email, password: password });
      console.log(response.json());
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };
  return (
    <div className="flex">
      <div className="w-1/2 h-[100vh] overflow-hidden">
        <img
          className="w-[100%] h-[100%] object-cover"
          src="src/images/bg.jpeg"
          alt="Login Banner"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="flex flex-col gap-6">
          <div className="bg-neutral-100 hover:bg-neutral-200 rounded-lg p-2 w-fit flex items-center justify-center">
            <BackArrowIcon />
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-4xl font-bold">Sign Up</div>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                autoComplete="off"
                className="text-lg w-88 rounded p-2 outline-none bg-neutral-100"
              />
              <div className="flex gap-2">
                <input
                  type={showPassword ? "text" : "Password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  autoComplete="off"
                  className="text-lg w-76 rounded p-2 outline-none bg-neutral-100"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="bg-neutral-100 hover:bg-neutral-200 rounded-lg p-2 w-fit flex items-center justify-center"
                >
                  {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                </div>
              </div>
              <div className="flex gap-1">
                <div className="text-sm">Already have an account?</div>
                <Link
                  to="/login"
                  className="text-sm underline text-blue-500 hover:text-blue-600
                  font-semibold cursor-pointer"
                >
                  {" "}
                  Login
                </Link>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-xl font-bold text-white hover:bg-blue-600 rounded-md p-2 cursor-pointer"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
