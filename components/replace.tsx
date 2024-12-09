import React from "react";

const replacePlaceholderWithJSX = (
  text: string,
  placeholder: string,
  replacement: React.ReactNode,
) => {
  const parts = text.split(placeholder);

  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < parts.length - 1 && replacement}
    </React.Fragment>
  ));
};

const Replace = ({
  text,
  placeholder,
  replacement,
}: {
  text: string;
  placeholder: string;
  replacement: React.ReactNode;
}) => {
  return <>{replacePlaceholderWithJSX(text, placeholder, replacement)}</>;
};

export default Replace;
