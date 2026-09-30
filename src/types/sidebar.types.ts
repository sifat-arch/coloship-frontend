export interface sidebarItem {
  title: string;
  url: string;
}

export interface sidebarGroup {
  title: string;
  items: sidebarItem[];
}
export type sidebarItems = sidebarGroup[]