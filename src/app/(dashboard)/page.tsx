"use client";
import { Spinner, Tooltip, useDisclosure } from "@nextui-org/react";
import { useQuery } from "urql";
import { PlusIcon } from "lucide-react";
//local
import Issue from "@/components/Issue";
import CreateIssue from "@/components/CreateIssue";
import IssuesHeader from "@/app/components/IssuesHeader";
import { ISSUES_QUERY } from "@/gql/ISSUES_QUERY";

const IssuesPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [{ data, fetching, error }, replay] = useQuery({
    query: ISSUES_QUERY,
  });

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <header>
        <IssuesHeader title="All Issues">
          <Tooltip content="New Issue">
            <button onClick={onOpen}>
              <PlusIcon size={14} />
            </button>
          </Tooltip>
        </IssuesHeader>
      </header>
      <main>
        <ol className="issues-list">
          <li>
            <h4>Title</h4>
            <h4>Content</h4>
            <h4>Status</h4>
          </li>
          {fetching && <Spinner />}
          {data?.issues.map((issue: any) => (
            <Issue key={issue.id} issue={issue} />
          ))}
        </ol>
      </main>
      <CreateIssue isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default IssuesPage;
