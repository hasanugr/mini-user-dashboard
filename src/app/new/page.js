import UserForm from "@/components/UserForm";

export const metadata = { title: "Create New User | Mini User Dashboard" };

export default function NewUserPage() {
  return (
    <div className="space-y-6 mx-auto">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-300">Create New User</h1>
        <p className="text-slate-600">Add a new user to your dashboard</p>
      </div>

      {/* Form */}
      <UserForm mode="create" />
    </div>
  );
}
