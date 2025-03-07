"use client";

import { Spinner, Tooltip, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import { useQuery } from "urql";
//local
// import { ISSUES_QUERY } from "@/gql";
import { ISSUES_QUERY } from "@/gql/ISSUES_QUERY";
import Issue from "@/components/Issue";
import CreateIssue from "@/components/CreateIssue";
import IssuesHeader from "@/app/components/IssuesHeader";
import "./issues.css";

const IssuesPage = () => {
  /*  const [{ data, fetching, error }, replay] = useQuery({
    query: ISSUES_QUERY,
    variables: { email: "admin@admin.com" },
  });
 */

  const [{ data, fetching, error }, replay] = useQuery({
    query: ISSUES_QUERY,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (error) return <p>Error: {error.message}</p>;
  console.log("DATA", data);
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
            <Issue key={issue.id} issue={issue} replay={replay} />
          ))}
        </ol>
      </main>
      <CreateIssue isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default IssuesPage;
