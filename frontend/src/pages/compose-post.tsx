import Navbar from "../components/common/navbar.tsx";
import ComposePostForm from "../components/post/compose-post-form.tsx";
import { usePageTitle } from "../components/common/usePageTitle.ts";
export default function ComposePost() {
  usePageTitle("Compose Post");
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <ComposePostForm />
    </div>
  );
}
