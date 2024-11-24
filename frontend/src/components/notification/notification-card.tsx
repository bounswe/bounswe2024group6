"use client";

import { Card, CardBody, Avatar } from "@nextui-org/react";
import React from "react";

type Props = {
  content: React.ReactNode;
  timePassed: string;
};

export default function NotificationCard({ content, timePassed }: Props) {
  return (
    <Card className="w-[310px] p-2">
      <CardBody className="text-small text-default-600 text-justify leading-relaxed overflow-hidden flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <Avatar
            isBordered
            radius="full"
            className="w-6 h-6 text-tiny"
            src="https://nextui.org/avatars/avatar-1.png"
          />
          {content}
        </div>
        <p className="text-default-400 text-small">{timePassed}</p>
      </CardBody>
    </Card>
  );
}
