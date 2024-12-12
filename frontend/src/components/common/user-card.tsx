import React from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../lib/baseURL";
import { Profile, ProfileResponse } from "../../types";
import { convertProfileResponseToProfile } from "./utils";
import { AuthActions } from "../../components/auth/utils.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

type Props = {
    username: string;
    bio?: string;
    follower_count?: number;
    following_count?: number;
    is_followed?: boolean;
    name?: string;
    level?: string;
    profile_image?: string;
};

export const UserCard = ({
    username,
    bio,
    follower_count,
    following_count,
    is_followed,
    name,
    level,
    profile_image,
}: Props) => {
    const [isFollowed, setIsFollowed] = React.useState(false);
    const { getToken } = AuthActions();
    const token = getToken("access");
    const [profile, setProfile] = useState<Profile | null>(null);
    const [followCount, setFollowCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (username && (!follower_count)) {
            axios
                .get(`${BASE_URL}/profile/${username}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    const data: ProfileResponse = response.data;
                    console.log(data);
                    const profile = convertProfileResponseToProfile(data);
                    setIsFollowed(profile.is_followed);
                    setProfile(profile);
                    setFollowCount(profile.followers);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setFollowCount(follower_count || 0);
            setIsFollowed(is_followed || false);
        }
    }, [username, token, bio, follower_count, following_count, is_followed, name, level, profile_image]);

    const toggleFollow = () => {
        axios
          .post(
            `${BASE_URL}/profile/${isFollowed ? "unfollow" : "follow"}/`,
            {
              username: profile?.username || username,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setFollowCount(response.data.follower_count);
          })
          .catch((error) => {
            console.log(error);
          });
        setIsFollowed(!isFollowed);
      };

    return (
        <Card shadow="none" className="w-[300px] bg-transparent">
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{profile?.username || username}</h4>
                        <h5 className="text-small tracking-tight text-default-500">@{profile?.level || level}</h5>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    {(profile || username) && (username !== Cookies.get("username")) &&
                        <Button
                            className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                            color="primary"
                            radius="full"
                            size="sm"
                            variant={isFollowed ? "bordered" : "solid"}
                            onClick={toggleFollow}
                        >
                            {isFollowed ? "Unfollow" : "Follow"}
                        </Button>}
                    <Button color="primary" variant="faded" size="sm" radius="full" onClick={() => navigate(`/profile/${username}`)}>
                        Profile
                    </Button>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-0">
                <p className="text-small pl-px text-default-500">
                    {(profile?.bio || bio) || "Hey, new learner here!"}
                </p>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">{profile?.following || following_count}</p>
                    <p className=" text-default-500 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">{followCount}</p>
                    <p className="text-default-500 text-small">Followers</p>
                </div>
            </CardFooter>
        </Card>
    );
};
