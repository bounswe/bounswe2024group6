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
}: {
  setIsRegister: (value: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    Cookies.set("username", username);
    login(username, password)
      .json((json) => {
        console.log(json);
        
        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");

        navigate("/forum");
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  const { login, storeToken } = AuthActions();

  return (
    <div className="lg:w-1/3 flex pr-24 pl-12 lg:justify-end items-center h-screen">
      <div className="flex flex-col items-center w-full max-w-sm p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              type="username"
              label="Username"
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
          <span className="text-sm">Need to create an account? </span>
          <button
            onClick={() => {
              setIsRegister(true);
            }}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
