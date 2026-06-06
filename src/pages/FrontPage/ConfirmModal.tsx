import { createPortal } from 'react-dom';
import styles from './style.module.scss';

export type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Удалить',
  cancelLabel = 'Отмена',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className={styles.modalBackdrop}
      role="presentation"
      onClick={onCancel}
    >
      <div
        className={styles.modalWindow}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tree-delete-confirm-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onCancel();
          }
        }}
      >
        <h2 id="tree-delete-confirm-title" className={styles.modalTitle}>
          {title}
        </h2>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.modalButtonSecondary}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={styles.modalButtonDanger}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
