import React from "react";
import clsx from "clsx";

interface HeaderTextProps {
  children: React.ReactNode;
  as?: "headline" | "subtitle-1" | "subtitle-2" | "subtitle-3";
  className?: string;
}

const HeaderText: React.FC<HeaderTextProps> = ({
  children,
  as = "headline",
  className,
}) => {
  const headerTextClass = clsx(
    {
      "text-[24px] leading-[32px]": as === "headline",
      "text-[14px] leading-[16px]": as === "subtitle-1",
      "text-[12px] leading-[16px]": as === "subtitle-2",
      "text-[10px] leading-[16px]": as === "subtitle-3",
    },
    className
  );

  return <p className={`font-bold ${headerTextClass}`}>{children}</p>;
};

export default HeaderText;
