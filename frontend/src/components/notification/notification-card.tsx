"use client";

import { Card, CardBody, Avatar } from "@nextui-org/react";

type Props = {
  content: string;
  timePassed: string;
};

export default function NotificationCard({ content, timePassed }: Props) {
  return (
    <Card className="w-[740px] bg-white p-2">
      <CardBody className="text-small text-default-600 text-justify leading-relaxed overflow-hidden flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <Avatar
            isBordered
            radius="full"
            className="w-6 h-6 text-tiny"
            src="https://nextui.org/avatars/avatar-1.png"
          />
          <p>{content}</p>
        </div>
        <p className="text-default-400 text-small">{timePassed}</p>
      </CardBody>
    </Card>
  );
}
