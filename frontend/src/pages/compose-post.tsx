import Navbar from "../components/common/navbar.tsx";
import ComposePostForm from "../components/post/compose-post-form.tsx";

export default function ComposePost() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <ComposePostForm />
    </div>
  );
}
