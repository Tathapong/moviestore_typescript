import React from "react";

export type SetStateType<type = boolean> = React.Dispatch<React.SetStateAction<type>>;

export interface ChildrenPropsType {
  children: React.ReactNode;
}
