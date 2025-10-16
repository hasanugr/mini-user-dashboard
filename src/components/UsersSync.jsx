"use client";
import { useUsers } from "@/context/UsersProvider";
import { useEffect } from "react";

/**
 * Component to sync server users with client context
 * @param {Object} props
 * @param {Array} [props.serverUsers] - Array of users from server
 * @returns {null}
 */
export default function UsersSync({ serverUsers }) {
  const { syncServerUsers } = useUsers();

  useEffect(() => {
    if (serverUsers && syncServerUsers) {
      syncServerUsers(serverUsers);
    }
  }, [serverUsers, syncServerUsers, serverUsers?.length]);

  return null;
}
