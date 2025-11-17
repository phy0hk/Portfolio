const DisplayItem = ({ element }: { element: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: element }} />;
};
export default DisplayItem;
