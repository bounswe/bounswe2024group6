import Navbar from "../components/common/navbar.tsx";
import EditPostForm from "../components/post/edit-post-form.tsx";
import { usePageTitle } from "../components/common/usePageTitle.ts";
export default function EditPost() {
  usePageTitle("Edit Post");
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <EditPostForm />
    </div>
  );
}
