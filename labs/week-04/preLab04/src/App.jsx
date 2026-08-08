import { useState } from "react";
import AppHeader from "./components/AppHeader.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import { initialTasks } from "./data/initialTasks.js";


function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState("all");

  // 1. นำฟังก์ชัน handleAddTask ที่คุณให้มา มาวางตรงนี้                                                          
  // ฟังก์ชันนี้จะรับข้อมูลก้อนสำเร็จรูป (taskData) มาจาก TaskForm อีกที                                              
  function handleAddTask(taskData) {
    const newTask = {
      id: `TASK-${Date.now()}`,
      ...taskData,      // เอาชื่องานและหมวดหมู่ที่กรอกมาใส่ลง Object นี้                                        
      status: 'todo',   // เซ็ตสถานะเริ่มต้นให้เป็น todo                                                      
    };

    // อัปเดตรายการงานเดิม โดยเพิ่มงานใหม่เข้าไป                                                              
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const summary = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    doing: tasks.filter((task) => task.status === "doing").length,
    done: tasks.filter((task) => task.status === "done").length,
  };
  const filteredTasks =
    statusFilter === "all"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  function handleDeleteTask(taskId) {
    if (tasks.length === 0) {
      return <EmptyState />;
    }
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }
  return (
    <>
      <AppHeader
        title="Study Task Board"
        subtitle="CP03 — State, derived data และ filter"
      />

      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <section className="panel">

          {/* 2. โยนฟังก์ชัน handleAddTask ลงไปให้ TaskForm เพื่อให้มันเรียกใช้ตอน Submit */}
          <TaskForm onAddTask={handleAddTask} />

          <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
          <TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} />
        </section>
      </main>
    </>
  );
}

export default App;
