function DienosProgresas({ tasks = [] }) {
    const totalTasks = tasks.length
    const completedCount = tasks.filter((task) => task.completed).length
  
    // Apskaičiuojame atliktų užduočių procentą
    const percentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0
  
    return (
      <div className="progress-container">
        <div className="progress-header">
          <h2 className="tasks-title">Dienos progresas</h2>
          <span className="progress-percent">{percentage}%</span>
        </div>
  
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
  
        <p className="progress-text">
          Atlikta <strong>{completedCount}</strong> iš <strong>{totalTasks}</strong> užduočių
        </p>
      </div>
    )
  }
  
  export default DienosProgresas