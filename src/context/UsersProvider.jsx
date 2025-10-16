"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UsersCtx = createContext(null);

/**
 * Provider component to manage users state with localStorage persistence
 * @param {Object} props
 * @param {Array} [props.initialUsers] - Initial array of users from server
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export function UsersProvider({ initialUsers = [], children }) {
  const [added, setAdded] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [editedUsers, setEditedUsers] = useState([]);
  const [serverUsers, setServerUsers] = useState(initialUsers);

  // load from localStorage
  useEffect(() => {
    try {
      setAdded(JSON.parse(localStorage.getItem("addedUsers") || "[]"));
      setDeletedIds(JSON.parse(localStorage.getItem("deletedIds") || "[]"));
      setEditedUsers(JSON.parse(localStorage.getItem("editedUsers") || "[]"));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("addedUsers", JSON.stringify(added));
  }, [added]);

  useEffect(() => {
    localStorage.setItem("deletedIds", JSON.stringify(deletedIds));
  }, [deletedIds]);

  useEffect(() => {
    localStorage.setItem("editedUsers", JSON.stringify(editedUsers));
  }, [editedUsers]);

  const value = useMemo(() => {
    const merged = [
      ...added,
      ...serverUsers.filter((u) => !deletedIds.includes(String(u.id))),
    ];

    const editedMerged = merged.map((user) => {
      const edited = editedUsers.find((e) => String(e.id) === String(user.id));
      return edited ? { ...user, ...edited } : user;
    });

    return {
      users: editedMerged,
      addUserLocal: (u) =>
        setAdded((prev) => [
          { ...u, id: u.id || `local-${Date.now()}` },
          ...prev,
        ]),
      editUserLocal: (user) =>
        setEditedUsers((prev) => [
          user,
          ...prev.filter((u) => String(u.id) !== String(user.id)),
        ]),
      deleteUserLocal: (id) =>
        setDeletedIds((prev) => [...new Set([...prev, String(id)])]),
      syncServerUsers: (users) => setServerUsers(users),
    };
  }, [added, deletedIds, editedUsers, serverUsers]);

  return <UsersCtx.Provider value={value}>{children}</UsersCtx.Provider>;
}

export function useUsers() {
  const ctx = useContext(UsersCtx);
  if (!ctx) throw new Error("useUsers must be used within UsersProvider");
  return ctx;
}
