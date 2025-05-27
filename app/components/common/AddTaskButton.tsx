"use client";

import { icons } from "@/icons";
import { useState } from "react";
import Modal from "./Modal";
import TaskForm from "../TaskForm";

function AddTaskButton() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div
        className="fixed bottom-8 right-8 p-2 rounded-full primary-bg-shadow flex items-center justify-center min-w-[50px] min-h-[50px] cursor-pointer hover:scale-105 transition-transform duration-200 motion-reduce:transition-none"
        onClick={() => setOpenModal(true)}
      >
        {icons.plusIcon()}
      </div>
      {openModal && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <TaskForm
            onSuccess={() => {
              setOpenModal(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default AddTaskButton;
