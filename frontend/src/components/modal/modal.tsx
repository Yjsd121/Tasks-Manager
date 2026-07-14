import "./modal.css";
import { type ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <section className="layout">
      <div className="modal-container">{children}</div>
    </section>
  );
};
