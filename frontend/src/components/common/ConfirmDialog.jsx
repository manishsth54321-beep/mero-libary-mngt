import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({ open, onClose, onConfirm, title = "Confirm", message = "Are you sure?", confirmLabel = "Delete", confirmVariant = "danger" }) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxW="max-w-sm">
      <p className="text-slate-400 text-sm mb-5">{message}</p>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant={confirmVariant} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}