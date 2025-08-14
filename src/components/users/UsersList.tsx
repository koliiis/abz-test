import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import type { User } from "../../types/User";
import type { ApiResponse } from "../../types/ApiResponse";

interface UsersListProps {
  page: number;
  count: number;
  onNextUrlChange: (hasNext: boolean) => void;
}

export const UsersList = ({ page, count, onNextUrlChange }: UsersListProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`)
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        const sortedUsers = data.users.sort((a, b) => b.registration_timestamp - a.registration_timestamp);

        if (page === 1) {
          setUsers(sortedUsers);
        } else {
          setUsers((prevUsers) => [...prevUsers, ...sortedUsers]);
        }
        onNextUrlChange(!!data.links.next_url);
      })
      .catch((err) => console.error(err));
  }, [page, count, onNextUrlChange]);

  return (
    <div className="users-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
