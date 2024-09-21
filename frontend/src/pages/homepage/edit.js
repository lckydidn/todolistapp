import { useState } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { updateTask } from "@/fetching/fetch";

const EditTaskModal = ({ task, showModal, setShowModal, refreshTasks }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    priority: task.priority,
    dueDate: task.dueDate.split("T")[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateTask(task.id, formData);
      setShowModal(false);
      refreshTasks();
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>Edit Task</Modal.Header>
      <Modal.Body>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='title' value='Task Title' />
            <TextInput
              id='title'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor='priority' value='Priority' />
            <TextInput
              id='priority'
              name='priority'
              value={formData.priority}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor='dueDate' value='Due Date' />
            <TextInput
              id='dueDate'
              name='dueDate'
              type='date'
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Save</Button>
        <Button color='gray' onClick={() => setShowModal(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
