function TaskCard({ task, onDeleteTask }) {
  return (
    <article className="task-card">
      <div>
        <span className={`badge status-${task.status}`}>{task.status}</span>
        <h3>{task.title}</h3>
        <p>{task.category}</p>
        <button type="button" onClick={() => onDeleteTask(task.id)}>ลบงาน</button>
      </div>
    </article>
  );
}

export default TaskCard;
