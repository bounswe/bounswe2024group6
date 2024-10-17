import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { IconBookmark, IconMessageCircle } from "@tabler/icons-react";
import { IconThumbUp } from "@tabler/icons-react";

export default function App() {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    const maxLength = 250;

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const displayedText = isExpanded || text.length <= maxLength
        ? text
        : `${text.slice(0, maxLength)}... `;

    return (
        <Card className="w-[540px] px-2 pb-2 bg-white">
            <CardHeader className="flex flex-col items-start gap-2">
                <div className="flex w-full justify-between">
                    <div className="flex gap-3">
                        <Avatar isBordered radius="full" className="w-6 h-6 text-tiny" src="https://nextui.org/avatars/avatar-1.png" />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h5 className="text-small tracking-tight text-default-400">@alitariksahin</h5>
                        </div>
                    </div>

                    <p className="text-default-400 text-small">1 hour</p>
                </div>
                <Divider className="mt-1.5 bg-zinc-400" />
                <h4 className="text-lg font-semibold leading-none text-black">Enthusiastic In Daily Life</h4>

            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400 text-justify leading-relaxed overflow-hidden">
                <p>
                    {displayedText}
                    {!isExpanded && text.length > maxLength && (
                        <span
                            onClick={toggleExpand}
                            style={{ color: '#186df5', cursor: 'pointer' }}
                        >
                            Read more
                        </span>
                    )}
                </p>
            </CardBody>
            <CardFooter className="flex justify-between gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">54</p>
                    <IconThumbUp size={20} stroke={1.5} color="#186df5" />

                    <IconBookmark size={20} stroke={1.5} color="#186df5" />
                    <IconMessageCircle size={20} stroke={1.5} color="#186df5" />
                </div>
                <p className="text-green-700 text-small">@Vocabulary</p>
            </CardFooter>
        </Card>
    );
}
