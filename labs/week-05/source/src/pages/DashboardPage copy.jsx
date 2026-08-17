import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import FilterBar from '../components/FilterBar.jsx';
import LoadingState from '../components/LoadingState.jsx';
import RequestList from '../components/RequestList.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';
import useManualReload from '../hooks/useManualReload.js';
import { getRequests } from '../services/requestService.js';
getRequests().then((d) => console.log('ได้ข้อมูล', d.length, 'รายการ'));

function DashboardPage() {
  // จุดตั้งต้นจาก Week 04 — ทำงานได้ครบ แต่ยังเป็นหน้าเดียวและข้อมูลอยู่ในหน่วยความจำ
  // const [requests, setRequests] = useState(initialRequests);
  const [searchParams, setSearchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') ?? '';
  const [reloadKey, reload] = useManualReload();

  const [loadState, setLoadState] = useState('idle');
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setLoadState('loading');
    setErrorMessage('');
    setNotice('');

    getRequests({ scenario })
      .then((data) => {
        setRequests(data);
        setLoadState('success');
      })
      .catch((error) => {
        setErrorMessage(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
        setLoadState('error');
      });
    // TODO 5B: เพิ่ม cleanup guard เพื่อกัน stale update
  }, [scenario, reloadKey]);


  const summary = useMemo(() => ({
    total: requests.length,
    pending: requests.filter((request) => request.status === 'pending').length,
    inProgress: requests.filter((request) => request.status === 'in-progress').length,
    completed: requests.filter((request) => request.status === 'completed').length,
  }), [requests]);
  const filteredRequests = statusFilter === 'all' ? requests : requests.filter((request) => request.status === statusFilter);

  async function handleAdd(input) {
    setRequests((current) => [...current, { ...input, id: `REQ-W4-${Date.now()}`, status: 'pending' }]);
    setNotice('เพิ่มคำร้องในหน่วยความจำแล้ว — กด refresh แล้วจะหาย นี่คือโจทย์ของคาบ 5B');
  }

  function handleDelete(requestId) {
    setRequests((current) => current.filter((request) => request.id !== requestId));
    setNotice(`ลบคำร้อง ${requestId} จาก memory แล้ว`);
  }
  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow dark">CP00 · WEEK04 REGRESSION</p><h1>Campus Service Request</h1><p>ตรวจ add, filter, delete และ validation ก่อน refactor</p></div></div>
      {notice && <p className="notice" role="status">{notice}</p>}
      <SummaryPanel summary={summary} />
      <div className="workspace-grid">
        <section className="panel form-panel"><RequestForm onAddRequest={handleAdd} /></section>
        <section className="panel" aria-labelledby="request-list-title">
          <div className="section-heading"><h2 id="request-list-title">รายการคำร้อง</h2><FilterBar value={statusFilter} onFilterChange={setStatusFilter} /></div>
          <RequestList requests={filteredRequests} onDeleteRequest={handleDelete} />
        </section>
      </div>
    </section>
  );
}

export default DashboardPage;
