import type { User } from "../../types/User";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <img src={user.photo} alt={user.name} className="user-card__photo" />
      <h3 className="user-card__name">{user.name}</h3>
      <div className="user-card__description-div">
        <p className="user-card__description">{user.position}</p>
        <p className="user-card__description" title={user.email}>{user.email}</p>
        <p className="user-card__description">{user.phone}</p>
      </div>
    </div>
  );
};