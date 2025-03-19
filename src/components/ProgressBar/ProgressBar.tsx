import "./index.css";

interface ProgressBarProps {
  completed: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  const percentage: number = total === 0 ? 0 : (completed / total) * 100;

  return (
    <>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
        <span>
          {`${completed} of ${total} tasks completed ${percentage.toFixed(0)}%`}
        </span>
      </div>
    </>
  );
};

export default ProgressBar;
