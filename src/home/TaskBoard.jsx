import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TaskBoard = () => {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskCategory, setTaskCategory] = useState('todo');

    const openModal = (category, task = null) => {
        setTaskCategory(category);
        if (task) {
            setCurrentTask(task);
            setTaskTitle(task.title);
            setTaskDescription(task.description);
        } else {
            setCurrentTask(null);
            setTaskTitle('');
            setTaskDescription('');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
        setTaskTitle('');
        setTaskDescription('');
    };

    const addTask = () => {
        const newTask = {
            id: Date.now(),
            title: taskTitle,
            description: taskDescription,
            timestamp: new Date(),
        };
        setTasks((prevState) => ({
            ...prevState,
            [taskCategory]: [...prevState[taskCategory], newTask]
        }));
        closeModal();
    };

    const editTask = () => {
        setTasks((prevState) => ({
            ...prevState,
            [taskCategory]: prevState[taskCategory].map(task =>
                task.id === currentTask.id ? { ...task, title: taskTitle, description: taskDescription } : task
            )
        }));
        closeModal();
    };

    const deleteTask = (category, taskId) => {
        setTasks((prevState) => ({
            ...prevState,
            [category]: prevState[category].filter(task => task.id !== taskId)
        }));
    };

    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;

        const sourceCategory = source.droppableId;
        const destCategory = destination.droppableId;

        // Moving task from one category to another
        const [removedTask] = tasks[sourceCategory].splice(source.index, 1);
        tasks[destCategory].splice(destination.index, 0, removedTask);

        // Log the movement to the console
        console.log(`Task moved: ${removedTask.title}`);
        console.log(`Old Category: ${sourceCategory}`);
        console.log(`New Category: ${destCategory}`);

        // Update the tasks state
        setTasks({ ...tasks });
    };

    return (
        <div className='bg-[var(--color-background)] text-[var(--color-text)] min-h-[calc(100vh-64px)] mt-16'>
            <div className="flex flex-col lg:flex-row gap-4 p-4 ">
                <DragDropContext onDragEnd={onDragEnd}>
                    {['todo', 'inProgress', 'done'].map(category => (
                        <div key={category} className="flex-1 bg-[var(--color-background2)] p-4 rounded-lg">
                            <div className={`${category === 'todo' ? 'flex justify-between' : ''}`}>
                                <h2 className="text-center text-xl mb-4 capitalize font-bold">{category}</h2>
                                {category === 'todo' && (
                                    <button
                                        onClick={() => openModal(category)}
                                        className="py-1 px-3 mb-4 bg-[var(--color-primary)] rounded text-white hover:bg-blue-600"
                                    >
                                        Add Task
                                    </button>
                                )}
                            </div>
                            <Droppable droppableId={category}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="space-y-4"
                                    >
                                        {tasks[category].map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-[var(--color-card-background)] p-4 rounded-lg shadow-md"
                                                    >
                                                        <div className="flex justify-between mb-2">
                                                            <button
                                                                onClick={() => openModal(category, task)}
                                                                className="text-[var(--color-edit)] cursor-pointer"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => deleteTask(category, task.id)}
                                                                className="text-[var(--color-danger)] cursor-pointer"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                        <h3 className="font-semibold">{task.title}</h3>
                                                        <p className="text-sm text-gray-300">{task.description}</p>
                                                        <span className="text-xs text-gray-500">{task.timestamp.toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </DragDropContext>

                {/* Modal for Adding/Editing Task */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-[var(--color-background)] bg-opacity-50 flex items-center justify-center">
                        <div className="bg-[var(--color-background2)] p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-lg font-semibold mb-4">{currentTask ? 'Edit Task' : 'Add Task'}</h2>
                            <input
                                type="text"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                placeholder="Task Title"
                                className="w-full mb-2 p-2 bg-[var(--color-card-background)] rounded"
                            />
                            <textarea
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                placeholder="Task Description"
                                className="w-full mb-4 p-2 bg-[var(--color-card-background)] rounded"
                            />
                            <div className="flex justify-end">
                                <button onClick={closeModal} className="cursor-pointer mr-2 px-4 py-2 bg-[var(--color-background2)] border rounded">Cancel</button>
                                <button
                                    onClick={currentTask ? editTask : addTask}
                                    className="cursor-pointer px-4 py-2 bg-[var(--color-primary)] rounded text-white"
                                >
                                    {currentTask ? 'Update Task' : 'Add Task'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default TaskBoard;
