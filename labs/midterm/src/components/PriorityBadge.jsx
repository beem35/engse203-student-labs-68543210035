
function PriorityBadge({ priority }) {
    let badgeClass = '';
    let badgeText = '';
    if (priority === 'urgent') {
        badgeClass = 'priority-urgent';
        badgeText = 'เร่งด่วน';
    } else if (priority === 'normal') {
        badgeClass = 'priority-normal';
        badgeText = 'ปกติ';
    }else {
        badgeClass = 'priority-unknown';
        badgeText = 'ไม่ระบุ';
    }
    return <span className={badgeClass}>{badgeText}</span>;
}
export default PriorityBadge;