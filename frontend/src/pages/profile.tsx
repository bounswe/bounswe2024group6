import { Navbar } from "../components/common";
import { Avatar, Button, Divider, Card } from "@nextui-org/react";

export default function Profile() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex justify-between items-center w-full px-32 py-5">
        <div className="flex items-center px-5 bg-white rounded-lg">
          {/* Avatar on the left */}
          <Avatar
            src="https://cdn.evrimagaci.org/q0-4ffcpiHlsmEHyfYCcYQBWPNg=/storage.evrimagaci.org%2Fold%2Fmi_media%2Fafcae823e61eefb077e1f223594b1e7f.jpeg"
            className="mr-3 w-24 h-24"
          />
          <div className="ml-4">
            <h3 className="text-xl font-semibold">Elifnd</h3>
            <p className="text-gray-500">@B1</p>
          </div>
        </div>
        <Button className="border-2 border-blue-900 text-blue-900 font-bold bg-white px-8 py-6 rounded-md">150 Following</Button>
        <Button className="border-2 border-blue-900 text-blue-900 font-bold bg-white px-8 py-6 rounded-md">200 Followers</Button>
        <Button className="border-2 border-blue-900 text-blue-900 font-bold bg-white px-8 py-6 rounded-md">Solved Quizzes</Button>
      </div>
      <Divider className="my-4 border-t-2 border-gray-400 border-dashed" />
      <Card className="w-48 border-2 border-blue-900 items-center mx-auto my-3">
        <div className="flex flex-row w-full justify-between items-center">
          <Button className="text-blue-900 font-bold bg-white px-8 py-6 rounded-md">Quizzes</Button>
          <p className="text-blue-900 font-bold bg-white rounded-md">/</p>
          <Button className="text-blue-900 font-bold bg-white px-8 py-6 rounded-md">Posts</Button>
        </div>
      </Card>
    </div>
  );
}
