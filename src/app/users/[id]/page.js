import { fetchUser } from "@/lib/users";
import UserDetailClient from "@/components/UserDetailClient";

export const dynamic = "force-dynamic";

/**
 * User detail page component
 * @param {Object} props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.id - User ID from the URL
 * @returns {JSX.Element}
 */
export default async function UserDetailPage({ params }) {
  const { id } = (await params) || {};

  let serverUser = null;
  try {
    serverUser = await fetchUser(id);
  } catch (error) {
    // User not found on server, will check localStorage in client component
    console.warn("User not found on server:", error.message);
  }

  return <UserDetailClient userId={id} serverUser={serverUser} />;
}
