import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import useManualReload from '../hooks/useManualReload.js';
import { getRequestById } from '../services/requestService.js';

function RequestDetailPage() {
  return (
    <section data-testid="page-request-detail">
      <div className="page-heading"><div><p className="eyebrow dark">TODO 5A-CP05a</p><h1>รายละเอียดคำร้อง</h1><p>อ่านรหัสจาก URL แล้วโหลดผ่าน Service · แยกกรณีพบและไม่พบให้ชัด</p></div></div>
    </section>
  );
}

export default RequestDetailPage;
