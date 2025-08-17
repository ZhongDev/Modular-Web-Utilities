import { ReactElement, ComponentType } from 'react';

export interface ModuleMeta {
  title: string;
  route: string;
  description: string;
  icon?: ReactElement | string;
}

export interface Module {
  title: string;
  route: string;
  description: string;
  icon?: ReactElement | string;
  Component: ComponentType;
}