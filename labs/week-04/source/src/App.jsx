import AppHeader from "./components/AppHeader.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import RequestForm from "./components/RequestForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import RequestList from "./components/RequestList.jsx";
import { initialRequests } from "./data/initialRequests.js";
import { useState } from "react";

function App() {
  // TODO LAB4-R04: เปลี่ยน requests/statusFilter เป็น state
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState("all");

  // TODO LAB4-R04: คำนวณ summary เป็น derived data
  const summary = {
    total: requests.length,
    pending: requests.filter((request) => request.status === "pending").length,
    inProgress: requests.filter((request) => request.status === "in-progress")
      .length,
    completed: requests.filter((request) => request.status === "completed")
      .length,
  };

  // TODO LAB4-R08: คำนวณ filteredRequests จาก requests + statusFilter
  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((request) => request.status === statusFilter);

  function handleAddRequest(requestData) {
    // 1. หาเลข ID ที่มากที่สุดจากรายการปัจจุบัน
    let maxIdNum = 0;
    requests.forEach((req) => {
      // ตัดคำว่า 'REQ-' ออกด้วย .replace() แล้วแปลงค่าที่เหลือเป็นตัวเลขด้วย parseInt()
      const currentNum = parseInt(req.id.replace("REQ-", ""), 10);
      if (currentNum > maxIdNum) {
        maxIdNum = currentNum;
      }
    });
    // 2. เอาเลขมากสุดมาบวก 1
    const nextIdNum = maxIdNum + 1;

    // 3. แปลงเป็น String แล้วใช้ .padStart(3, '0') เพื่อเติมเลข 0 ด้านหน้าให้ครบ 3 หลัก
    const formattedId = `REQ-${String(nextIdNum).padStart(3, "0")}`;
    const newRequest = {
      id: formattedId,
      ...requestData,
      status: "pending",
    };
    setRequests((currentRequests) => [ newRequest, ...currentRequests ]);
  }

  function handleDeleteRequest(requestId) {
    if (requests.length === 0) {
      return <EmptyState />;
    }
    setRequests((currentRequests) => 
      currentRequests.filter((request) => request.id !== requestId)
    );
  }

  return (
    <>
      <AppHeader
        title="Campus Service Request"
        subtitle="LAB 4 Starter — เปลี่ยน DOM-driven UI เป็น State-driven React UI"
      />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          <RequestForm onAddRequest={handleAddRequest} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar
                value={statusFilter}
                onFilterChange={setStatusFilter}
              />
            </div>
            <RequestList
              requests={filteredRequests}
              onDeleteRequest={handleDeleteRequest}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
