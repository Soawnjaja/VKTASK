import { useCallback, useState } from 'react';
import {
  mokTree,
  type TreeDirectoryNode,
} from '../../lib/mokTree';
import {
  collectAllDirectoryIds,
  removeFileByIdFromTree,
} from '../../lib/treeUtils';
import { ConfirmModal } from './ConfirmModal';
import { TreeView } from './TreeView';
import styles from './style.module.scss';

export type FrontPageProps = {
  root?: TreeDirectoryNode;
};

/**
 * Страница держит состояние UI (развёрнутость, выбор, удаление) и передаёт его в {@link TreeView}.
 * Чистые операции над данными — в {@link ../../lib/treeUtils|treeUtils}.
 * Подтверждение удаления — {@link ConfirmModal}.
 */
export default function FrontPage({ root: initialRoot = mokTree() }: FrontPageProps) {
  const [tree, setTree] = useState<TreeDirectoryNode>(initialRoot);
  const [expandedDirIds, setExpandedDirIds] = useState<Set<string>>(
    () => collectAllDirectoryIds(initialRoot),
  );
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const toggleDirectory = useCallback((directoryId: string) => {
    setExpandedDirIds((prev) => {
      const next = new Set(prev);
      if (next.has(directoryId)) {
        next.delete(directoryId);
      } else {
        next.add(directoryId);
      }
      return next;
    });
  }, []);

  const requestDeleteFile = useCallback((file: { id: string; name: string }) => {
    setPendingDelete(file);
  }, []);

  const cancelDelete = useCallback(() => {
    setPendingDelete(null);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) {
      return;
    }
    const { id } = pendingDelete;
    setTree((prev) => removeFileByIdFromTree(prev, id));
    setSelectedFileId((cur) => (cur === id ? null : cur));
    setPendingDelete(null);
  }, [pendingDelete]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Файловое дерево</h1>
      <TreeView
        root={tree}
        expandedDirIds={expandedDirIds}
        onToggleDirectory={toggleDirectory}
        selectedFileId={selectedFileId}
        onSelectFile={setSelectedFileId}
        onFileDoubleClick={requestDeleteFile}
      />
      <ConfirmModal
        open={pendingDelete != null}
        title="Удалить файл?"
        message={
          pendingDelete
            ? `Удалить «${pendingDelete.name}» из дерева? Это действие нельзя отменить.`
            : ''
        }
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
