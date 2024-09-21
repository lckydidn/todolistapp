import { useState } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { createTask } from "@/fetching/fetch";

const AddTaskModal = ({ showModal, setShowModal, refreshTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    task: "",
    priority: "",
    dueDate: "",
    completed: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const { title, task, priority, dueDate } = formData;
      if (!title || !task) {
        alert("Title and Task are required!");
        return;
      }
      await createTask({
        title,
        task,
        priority,
        dueDate,
      });

      setShowModal(false);
      refreshTasks();
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>Add Task</Modal.Header>
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
            <Label htmlFor='task' value='Task Description' />
            <TextInput
              id='task'
              name='task'
              value={formData.task}
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

export default AddTaskModal;
