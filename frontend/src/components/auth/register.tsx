"use client";
import { Button, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "./utils";

import Cookies from "js-cookie";

type FormData = {
  email: string;
  username: string;
  password: string;
};

export default function Register({
  setIsRegister,
}: {
  setIsRegister: (value: boolean) => void;
}) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const { register: registerUser } = AuthActions(); // Note: Renamed to avoid naming conflict with useForm's register

  const onSubmit = () => {
    registerUser(email, username, password)
      .json(() => {
        Cookies.set("username", username);
        Cookies.set("password", password);
        setIsRegister(false);
      })
      .catch((err) => {
        setError("root", {
          type: "manual",
          message: err.json.detail,
        });
      });
  };

  const validatePassword = (password: string) => password.match(/^.{8,}$/i);

  const isInvalidPassword = useMemo(() => {
    if (password === "") return false;

    return validatePassword(password) ? false : true;
  }, [password]);

  const validateConfirmPassword = (confirmPassword: string) =>
    confirmPassword.match(password);

  const isInvalidConfirmPassword = useMemo(() => {
    if (confirmPassword === "") return false;

    return validateConfirmPassword(confirmPassword) ? false : true;
  }, [confirmPassword]);

  return (
    <div className=" flex  lg:justify-end items-center">
      <div className="flex flex-col items-center w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Join Us</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              defaultValue=""
              type="text"
              variant="bordered"
              isRequired
              label="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              defaultValue=""
              type="email"
              variant="bordered"
              isRequired
              label="Email"
              {...register("email", { required: "Email is required" })}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="text-xs text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <Input
              label="Password"
              defaultValue=""
              variant="bordered"
              isRequired
              {...register("password", { required: "Password is required" })}
              isInvalid={isInvalidPassword}
              color={isInvalidPassword ? "danger" : "default"}
              errorMessage="Password must be at least 8 characters"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-56"
            />
            {errors.password && (
              <span className="text-xs text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <Input
              label="Confirm Password"
              defaultValue=""
              variant="bordered"
              isRequired
              isInvalid={isInvalidConfirmPassword}
              color={isInvalidConfirmPassword ? "danger" : "default"}
              errorMessage="Passwords do not match"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="w-56"
            />
          </div>
          <Button
            color="primary"
            className="w-full"
            type="submit"
            isDisabled={
              username === ""
                ? true
                : email === "" ||
                  password === "" ||
                  isInvalidPassword ||
                  confirmPassword === "" ||
                  isInvalidConfirmPassword
            }
          >
            Sign Up
          </Button>
        </form>
        <div className="text-center mt-6">
          <span className="text-sm">Already have an account? </span>
          <button
            onClick={() => setIsRegister(false)}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
