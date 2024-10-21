import { Navbar } from "../components/common";
import { ComposePostForm } from "../components/post";

export default function ComposePost() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <ComposePostForm />
    </div>
  );
}
