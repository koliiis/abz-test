import { forwardRef, useImperativeHandle, useState } from "react";
import { UsersList } from "./UsersList";

export type UsersSectionRef = {
  resetToFirstPage: () => void;
};

export const UsersSection = forwardRef<UsersSectionRef>((_, ref) => {
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);

  const handleShowMoreClick = () => {
    setPage((prev) => prev + 1);
  };

  useImperativeHandle(ref, () => ({
    resetToFirstPage: () => {
      setPage(1);
    },
  }));

  return (
    <section className="users-section">
      <h2 className="users-section__title">Working with GET request</h2>
      <UsersList
        page={page}
        count={6}
        onNextUrlChange={setHasNextPage}
      />
      {hasNextPage && (
        <button
          className="btn users-section__btn"
          onClick={handleShowMoreClick}
        >
          Show more
        </button>
      )}
    </section>
  );
});
