import { useRef } from "react";
import { UserFormSection } from "../form/UserFormSection";
import { HeroSection } from "../hero/HeroSection";
import { UsersSection, type UsersSectionRef } from "../users/UsersSection";

export const Main = () => {
  const usersSectionRef = useRef<UsersSectionRef>(null);

  return (
    <main className="main">
      <HeroSection />
      <div className="main__content">
        <UsersSection ref={usersSectionRef} />
        <UserFormSection
          onUserRegistered={() => {
            usersSectionRef.current?.resetToFirstPage();
          }}
        />
      </div>
    </main>
  );
};
