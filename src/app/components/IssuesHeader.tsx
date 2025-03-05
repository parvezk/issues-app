const IssuesHeader = ({ title, children }) => {
  return (
    <header className="issues-header">
      <h4>{title}</h4>
      {children}
    </header>
  );
};

export default IssuesHeader;
