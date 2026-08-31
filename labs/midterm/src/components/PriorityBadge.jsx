
function PriorityBadge({ priority }) {
    let badgeClass = '';
    let badgeText = '';
    if (priority === 'urgent') {
        badgeClass = 'priority-urgent';
        badgeText = 'ด่วน';
    } else if (priority === 'normal') {
        badgeClass = 'priority-normal';
        badgeText = 'ปกติ';
    }
    return <span className={badgeClass}>{badgeText}</span>;
}
export default PriorityBadge;