import { WithClassName } from "@/types";

export type BaseIconProps = WithClassName;

export const getClassName = (className?: string) => {
  return className || "size-4";
};
