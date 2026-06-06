import type { TreeDirectoryNode } from './mokTree';

export function removeFileByIdFromTree(
  root: TreeDirectoryNode,
  targetId: string,
): TreeDirectoryNode {
  return {
    ...root,
    children: root.children
      .filter((child) => !(child.type === 'file' && child.id === targetId))
      .map((child) =>
        child.type === 'directory'
          ? removeFileByIdFromTree(child, targetId)
          : child,
      ),
  };
}

export function collectAllDirectoryIds(root: TreeDirectoryNode): Set<string> {
  const ids = new Set<string>([root.id]);
  for (const child of root.children) {
    if (child.type === 'directory') {
      const nested = collectAllDirectoryIds(child);
      nested.forEach((id) => ids.add(id));
    }
  }
  return ids;
}
