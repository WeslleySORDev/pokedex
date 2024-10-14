import React from "react";
import clsx from "clsx";

interface BodyTextProps {
  children: React.ReactNode;
  as?: "caption" | "body-1" | "body-2" | "body-3";
  className?: string;
}

const BodyText: React.FC<BodyTextProps> = ({
  children,
  as = "caption",
  className,
}) => {
  const bodyTextClass = clsx(
    {
      "text-[8px] leading-[12px]": as === "caption",
      "text-[14px] leading-[16px]": as === "body-1",
      "text-[12px] leading-[16px]": as === "body-2",
      "text-[10px] leading-[16px]": as === "body-3",
    },
    className 
  );

  return <p className={`font-normal ${bodyTextClass}`}>{children}</p>;
};

export default BodyText;
