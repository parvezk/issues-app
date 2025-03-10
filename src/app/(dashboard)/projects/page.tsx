"use client";
import { useUserContext } from "@/context/UserContext";

const ProjectsPage = () => {
  const { user } = useUserContext();

  return (
    <div>
      <header>
        {user && (
          <>
            <p>Hello {user.email}</p>
            <p>Created: {new Date(user.createdAt).toDateString()}</p>
          </>
        )}
      </header>
      <main>Projects</main>
    </div>
  );
};

export default ProjectsPage;
