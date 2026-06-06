import type { TreeDirectoryNode, TreeNode } from '../../lib/mokTree';
import styles from './style.module.scss';

type TreeHandlers = {
  expandedDirIds: Set<string>;
  onToggleDirectory: (directoryId: string) => void;
  selectedFileId: string | null;
  onSelectFile: (fileId: string) => void;
  onFileDoubleClick: (file: { id: string; name: string }) => void;
};

export type TreeViewProps = TreeHandlers & {
  root: TreeDirectoryNode;
};

function FolderIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M10 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8a2 2 0 0 0-2-2h-8l-2-2z"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
      />
    </svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`${styles.chevron} ${expanded ? '' : styles.chevronCollapsed}`}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z" />
    </svg>
  );
}

type TreeNodeItemProps = TreeHandlers & {
  node: TreeNode;
};

/** Рекурсивный рендер одного узла: вызывается из себя же для каждого child. */
function TreeNodeItem({
  node,
  expandedDirIds,
  onToggleDirectory,
  selectedFileId,
  onSelectFile,
  onFileDoubleClick,
}: TreeNodeItemProps) {
  if (node.type === 'file') {
    const selected = selectedFileId === node.id;
    return (
      <li className={styles.node}>
        <div
          role="button"
          tabIndex={0}
          className={`${styles.fileRow} ${selected ? styles.fileRowSelected : ''}`}
          onClick={() => onSelectFile(node.id)}
          onDoubleClick={() => onFileDoubleClick({ id: node.id, name: node.name })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectFile(node.id);
            }
          }}
        >
          <FileIcon />
          <span className={styles.label}>{node.name}</span>
          <span className={styles.fileSize}>{node.size}</span>
        </div>
      </li>
    );
  }

  const expanded = expandedDirIds.has(node.id);

  return (
    <li className={styles.node}>
      <button
        type="button"
        className={styles.dirRow}
        onClick={() => onToggleDirectory(node.id)}
        aria-expanded={expanded}
      >
        <ChevronIcon expanded={expanded} />
        <FolderIcon />
        <span className={styles.label}>{node.name}</span>
      </button>
      {expanded ? (
        <ul className={styles.nestedList}>
          {node.children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              expandedDirIds={expandedDirIds}
              onToggleDirectory={onToggleDirectory}
              selectedFileId={selectedFileId}
              onSelectFile={onSelectFile}
              onFileDoubleClick={onFileDoubleClick}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/**
 * Корневой список дерева: рекурсия сосредоточена в {@link TreeNodeItem}.
 * Сюда прокидываются колбэки и набор раскрытых директорий с родителя (страница).
 */
export function TreeView({
  root,
  expandedDirIds,
  onToggleDirectory,
  selectedFileId,
  onSelectFile,
  onFileDoubleClick,
}: TreeViewProps) {
  return (
    <ul className={styles.treeRoot}>
      <TreeNodeItem
        node={root}
        expandedDirIds={expandedDirIds}
        onToggleDirectory={onToggleDirectory}
        selectedFileId={selectedFileId}
        onSelectFile={onSelectFile}
        onFileDoubleClick={onFileDoubleClick}
      />
    </ul>
  );
}
