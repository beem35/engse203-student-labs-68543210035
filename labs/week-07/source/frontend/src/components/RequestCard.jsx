import { Link } from "react-router-dom";
const NEXT_STATUS_MAP = {
  pending: "in-progress",
  "in-progress": "completed",
};
function RequestCard({ request, onDeleteRequest, onUpdateStatus }) {
  const nextStatus = NEXT_STATUS_MAP[request.status];
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3>
          <Link to={`/requests/${request.id}`}>{request.requestType}</Link>
        </h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <p>
          <span className={`badge ${request.status}`}>{request.status}</span> ·{" "}
          {request.priority}
        </p>
      </div>
      <div>
        {request.status !== "completed" && (
          <button
            className="button secondary"
            type="button"
            onClick={() => onUpdateStatus(request.id ,nextStatus)}
            aria-label={`เปลี่ยนสถานะ ${request.id}`}
          >
            เปลี่ยนสถานะ
          </button>
        )}

        <button
          className="button danger"
          type="button"
          onClick={() => onDeleteRequest(request.id)}
          aria-label={`ลบคำร้อง ${request.id}`}
        >
          ลบ
        </button>
      </div>
    </article>
  );
}

export default RequestCard;
