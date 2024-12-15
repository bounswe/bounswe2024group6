"use client";
import { Button, Input } from "@nextui-org/react";

import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./login-eye";

import { useForm } from "react-hook-form";
import { AuthActions } from "./utils";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

type FormData = {
  username: string;
  password: string;
};

export default function Login({
  setIsRegister,
  isGuestView,
}: {
  setIsRegister: (value: boolean) => void;
  isGuestView?: boolean;
}) {
  const [username, setUsername] = useState(Cookies.get("username") || "");
  const [password, setPassword] = useState(Cookies.get("password") || "");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const onSubmit = () => {
    login(username, password)
      .json((json) => {
        Cookies.set("username", username);
        Cookies.set("password", password);
        console.log(json);

        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");

        checkAdmin().then((isAdmin) => {
          Cookies.set("isAdmin", isAdmin.toString());
        });

        if (isGuestView) {
          navigate(0);
        } else {
          navigate("/forum");
        }
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  const { login, storeToken, checkAdmin } = AuthActions();

  return (
    <div className=" flex lg:justify-end items-center">
      <div className="flex flex-col items-center w-full max-w-sm p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              type="username"
              label="Username"
              variant="bordered"
              defaultValue={Cookies.get("username") || ""}
              {...register("username", { required: true })}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <span className="text-xs text-red-600">Username is required</span>
            )}
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                label="Password"
                variant="bordered"
                defaultValue={Cookies.get("password") || ""}
                {...register("password", { required: true })}
                onChange={(e) => setPassword(e.target.value)}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
              />
              {errors.password && (
                <span className="text-xs text-red-600">
                  Password is required
                </span>
              )}
            </div>
          </div>
          <Button type="submit" color="primary" className="w-full">
            Log in
          </Button>
          <div className="text-center">
            {errors.root && (
              <span className="text-xs text-red-600">
                Wrong username or password
              </span>
            )}
          </div>
        </form>
        <div className="text-center mt-6">
          <span className="text-sm ">Need to create an account? </span>
          <button
            onClick={() => {
              setIsRegister(true);
            }}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <span className="text-sm">Or continue as a </span>
          <button
            onClick={isGuestView ? () => navigate(0) : () => navigate("/forum")}
            className="text-blue-600 hover:underline"
          >
            Guest
          </button>
        </div>
      </div>
    </div>
  );
}
