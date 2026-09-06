export type AXQIconNode = [elementName: string, attrs: Record<string, string>];
export type AXQIcon = { name: string, type: 'outline' | 'filled', nodes: AXQIconNode[] };
export type AXQIcons = { [key: string]: AXQIcon };
