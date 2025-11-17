import ReactDOMServer from "react-dom/server";
export const elementToHtml = (element: React.ReactNode): string => {
  return ReactDOMServer.renderToString(element);
};
