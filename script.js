// Trích xuất Hooks từ React toàn cục
const { useState, useEffect } = React;

// Trích xuất Icons từ thư viện Lucide React
const { 
  LayoutDashboard, Users, FileText, AlertTriangle, Search, PlusCircle, 
  CheckCircle, Clock, Sparkles, Loader2, Bot, FileInput, Save, X, UserCircle,
  FolderOpen, ShieldAlert, Target, Network, TrendingUp, ChevronLeft, ArrowRight,
  Activity, HeartHandshake, BriefcaseMedical, GraduationCap, Scale
} = lucideReact;

// --- MOCK DATA ---
const initialClients = [
  { 
    id: 'TE-001', alias: 'L.T.H', age: 16, category: 'Bạo lực gia đình / Bỏ học', riskScore: 16, riskLevel: 'Khẩn cấp', lastVisit: '15/04/2026', status: 'Đang can thiệp',
    phone: '090xxxxxxx', address: 'Quận 4, TP.HCM',
    details: {
      family: 'Sống với bà ngoại (70 tuổi, yếu). Mẹ đơn thân đi làm xa. Dượng ruột hay say xỉn bạo hành.',
      history: 'Từng nhập viện do chấn thương phần mềm năm 2025.',
      barriers: ['Thể chất: Suy dinh dưỡng nhẹ, có vết bầm.', 'Tâm lý: Lo âu, thu mình, sợ nam giới.', 'Xã hội: Đã nghỉ học 2 tháng, bạn bè xa lánh.'],
      strengths: ['Rất thương bà ngoại (động lực)', 'Có năng khiếu vẽ', 'Khát khao được đi học lại'],
      goals: [
        { id: 1, text: 'Tách khỏi môi trường bạo lực (Cách ly khỏi dượng)', status: 'Hoàn thành' },
        { id: 2, text: 'Đánh giá và ổn định tâm lý ban đầu', status: 'Đang tiến hành' },
        { id: 3, text: 'Hỗ trợ quay lại trường hoặc học nghề', status: 'Chưa bắt đầu' }
      ],
      referrals: [
        { org: 'Hội LHPN Quận 4', service: 'Hỗ trợ pháp lý / Cách ly', status: 'Đã kết nối', date: '10/04/2026', icon: Scale },
        { org: 'Phòng khám Tâm lý NVH', service: 'Tham vấn trị liệu', status: 'Đang điều trị', date: '12/04/2026', icon: Activity },
        { org: 'Mái ấm Ánh Sáng', service: 'Nơi ở tạm lánh', status: 'Chờ phản hồi', date: '15/04/2026', icon: HeartHandshake }
      ],
      timeline: [
        { date: '15/04/2026', event: 'Đánh giá định kỳ: Điểm giảm từ 18 xuống 16. Thân chủ ngủ ngon hơn.' },
        { date: '12/04/2026', event: 'Đưa thân chủ đến buổi tham vấn tâm lý đầu tiên. Hợp tác tốt.' },
        { date: '10/04/2026', event: 'Tiếp nhận ca khẩn cấp. Phối hợp đưa thân chủ rời khỏi nhà dượng.' }
      ]
    }
  },
  { id: 'PN-042', alias: 'T.T.B', age: 35, category: 'Mẹ đơn thân/Nghèo', riskScore: 8, riskLevel: 'Trung bình', lastVisit: '10/04/2026', status: 'Theo dõi' },
  { id: 'NC-105', alias: 'L.V.C', age: 68, category: 'Người già neo đơn', riskScore: 3, riskLevel: 'Thấp', lastVisit: '01/04/2026', status: 'Sắp đóng ca' },
];

function CaseManagementDemo() {
  const [activeTab, setActiveTab] = useState('clients');
  const [clients, setClients] = useState(initialClients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [detailSubTab, setDetailSubTab] = useState('info'); 

  // UI Helpers
  const getRiskBadge = (level) => {
    switch(level) {
      case 'Khẩn cấp': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1 w-max"><AlertTriangle size={12}/> Khẩn cấp</span>;
      case 'Trung bình': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1 w-max"><Clock size={12}/> Trung bình</span>;
      case 'Thấp': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 w-max"><CheckCircle size={12}/> Thấp</span>;
      default: return null;
    }
  };

  const handleOpenClientDetail = (client) => {
    setSelectedClient(client);
    setActiveTab('clientDetail');
    setDetailSubTab('info');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6">
          <h1 className="text-2xl font-black tracking-tight text-blue-400">SmartCase<span className="text-white">VN</span></h1>
          <p className="text-xs text-slate-400 mt-1">Hệ thống Quản lý Ca CTXH</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button onClick={() => {setActiveTab('dashboard'); setSelectedClient(null);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <LayoutDashboard size={20} /> Tổng quan
          </button>
          <button onClick={() => {setActiveTab('clients'); setSelectedClient(null);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'clients' || activeTab === 'clientDetail' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <Users size={20} /> Hồ sơ Thân chủ
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-xl font-bold text-slate-800">
            {activeTab === 'dashboard' && 'Bảng Điều Khiển'}
            {activeTab === 'clients' && 'Danh Sách Hồ Sơ Quản Lý'}
            {activeTab === 'clientDetail' && 'Chi tiết Hệ sinh thái Can thiệp'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm font-medium text-slate-600">
              <div className="w-2 h-2 rounded-full bg-green-500"></div> Mạng nội bộ bảo mật
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          
          {/* TAB: DASHBOARD (Giữ cho logic cơ bản) */}
          {activeTab === 'dashboard' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-xl mb-4">Tổng quan</h3>
               <p className="text-slate-500">Hệ thống đang quản lý {clients.length} hồ sơ. Vui lòng chuyển sang mục "Hồ sơ Thân chủ" để xem chi tiết.</p>
            </div>
          )}

          {/* TAB: CLIENTS LIST */}
          {activeTab === 'clients' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-bold text-lg">Hồ sơ đang quản lý</h3>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><ShieldAlert size={14}/> Dữ liệu đã mã hóa Client ID (Anonymized)</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-sm text-slate-500 uppercase tracking-wider">
                      <th className="p-4 font-bold">Mã Thân Chủ</th>
                      <th className="p-4 font-bold">Bí danh</th>
                      <th className="p-4 font-bold">Nhóm đối tượng</th>
                      <th className="p-4 font-bold">Mức Rủi Ro</th>
                      <th className="p-4 font-bold text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
                        <td className="p-4 font-black text-blue-700">{client.id}</td>
                        <td className="p-4 font-medium text-slate-700">{client.alias}</td>
                        <td className="p-4 text-slate-600">{client.category}</td>
                        <td className="p-4">{getRiskBadge(client.riskLevel)}</td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => handleOpenClientDetail(client)}
                            className="bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all"
                          >
                            Xem & Can thiệp
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: CLIENT DETAIL VIEW */}
          {activeTab === 'clientDetail' && selectedClient && (
            <div className="max-w-5xl mx-auto animate-in">
              
              <button onClick={() => setActiveTab('clients')} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-6 transition-colors">
                <ChevronLeft size={20} /> Trở về danh sách
              </button>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-black text-2xl">
                    {selectedClient.alias.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                      Hồ sơ: {selectedClient.id} {getRiskBadge(selectedClient.riskLevel)}
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">Bí danh: {selectedClient.alias} • Nhóm: {selectedClient.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 font-bold">Trạng thái ca</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-slate-800 text-white text-sm font-bold rounded-full">
                    {selectedClient.status}
                  </span>
                </div>
              </div>

              {/* 5 Tabs (nếu không có dữ liệu mở rộng thì báo chưa cập nhật) */}
              {selectedClient.details ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="flex overflow-x-auto border-b border-slate-200 hide-scrollbar">
                    {[
                      { id: 'info', icon: FolderOpen, label: '1. Thông tin' },
                      { id: 'assessment', icon: ShieldAlert, label: '2. Đánh giá' },
                      { id: 'plan', icon: Target, label: '3. Kế hoạch' },
                      { id: 'referrals', icon: Network, label: '4. Dịch vụ' },
                      { id: 'evaluation', icon: TrendingUp, label: '5. Lượng giá' }
                    ].map(tab => (
                      <button 
                        key={tab.id}
                        onClick={() => setDetailSubTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 font-bold whitespace-nowrap transition-all border-b-2 ${detailSubTab === tab.id ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                      >
                        <tab.icon size={18} /> {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-8">
                    {detailSubTab === 'info' && (
                      <div className="space-y-6 animate-in">
                        <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                          <ShieldAlert className="shrink-0 mt-0.5" size={20}/>
                          <p className="text-sm font-medium"><strong>Nguyên tắc Đạo đức:</strong> Mọi thông tin tại đây được mã hóa và chỉ được chia sẻ khi có sự đồng thuận.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg mb-4 border-b pb-2">Nhân khẩu học</h4>
                            <ul className="space-y-3 text-slate-600">
                              <li><strong>Độ tuổi:</strong> {selectedClient.age}</li>
                              <li><strong>Khu vực:</strong> {selectedClient.address}</li>
                              <li><strong>Điện thoại:</strong> {selectedClient.phone}</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg mb-4 border-b pb-2">Hoàn cảnh Gia đình</h4>
                            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                              {selectedClient.details.family}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {detailSubTab === 'assessment' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in">
                        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
                          <h4 className="font-bold text-red-800 flex items-center gap-2 mb-4"><AlertTriangle size={18}/> Các rào cản</h4>
                          <ul className="space-y-3">
                            {selectedClient.details.barriers.map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-red-900 text-sm font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div> {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
                          <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-4"><Sparkles size={18}/> Điểm mạnh</h4>
                          <ul className="space-y-3">
                            {selectedClient.details.strengths.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-emerald-900 text-sm font-medium">
                                <CheckCircle size={16} className="text-emerald-500 shrink-0"/> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {detailSubTab === 'plan' && (
                       <div className="space-y-4 animate-in">
                        {selectedClient.details.goals.map(goal => (
                          <div key={goal.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                            <div className="flex items-center gap-3">
                              <input type="checkbox" checked={goal.status === 'Hoàn thành'} className="w-5 h-5" readOnly />
                              <span className={`font-medium ${goal.status === 'Hoàn thành' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{goal.text}</span>
                            </div>
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100">{goal.status}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {detailSubTab === 'referrals' && (
                       <div className="grid gap-4 animate-in">
                        {selectedClient.details.referrals.map((ref, idx) => (
                          <div key={idx} className="flex justify-between p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">{ref.org}</h4>
                                <p className="text-slate-500 font-medium">{ref.service}</p>
                            </div>
                            <div className="text-right">
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100">{ref.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {detailSubTab === 'evaluation' && (
                       <div className="animate-in border-l-2 border-blue-200 ml-4 space-y-8">
                        {selectedClient.details.timeline.map((item, idx) => (
                          <div key={idx} className="relative pl-8">
                            <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-1 border-4 border-white"></div>
                            <div className="text-sm font-black text-blue-600 mb-1">{item.date}</div>
                            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-700 font-medium">{item.event}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-10 text-center text-slate-500 bg-white rounded-2xl border">Hồ sơ này chưa cập nhật chi tiết 5 bước.</div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Render ứng dụng vào thẻ <div id="root"></div> trong HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CaseManagementDemo />);