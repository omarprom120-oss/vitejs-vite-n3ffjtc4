// @ts-nocheck 
import React, { useState, useMemo } from 'react';

/* ---------- Inline icons ---------- */
const P = {
  home: 'M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',
  check: 'M5 13l4 4L19 7',
  users:
    'M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 10a4 4 0 100-8 4 4 0 000 8zM21 20v-2a4 4 0 00-3-3.9M16 2.1a4 4 0 010 7.8',
  book: 'M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4zM4 16a4 4 0 014-4h12',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  cal: 'M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  plus: 'M12 5v14M5 12h14',
  x: 'M6 6l12 12M18 6L6 18',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  bell: 'M6 8a6 6 0 1112 0c0 7 3 8 3 8H3s3-1 3-8M10 21h4',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
  edit: 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  file: 'M7 3h7l5 5v13H7zM14 3v5h5',
  phone:
    'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
};
const Ic = ({ n, c = 'w-5 h-5', fill }) => (
  <svg
    viewBox="0 0 24 24"
    className={c}
    fill={fill ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={P[n]} />
  </svg>
);

/* ---------- Seed data ---------- */
const DAYS = [
  'السبت',
  'الأحد',
  'الاثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
];
const seedGroups = [
  { id: 'g1', name: 'الصف الثالث الثانوي - مجموعة أ' },
  { id: 'g2', name: 'الصف الثاني الثانوي - مجموعة ب' },
  { id: 'g3', name: 'الصف الأول الثانوي - مجموعة ج' },
];
const seedStudents = [
  {
    id: 'S101',
    name: 'أحمد محمود',
    phone: '01012345678',
    group: 'g1',
    stars: 12,
    notes: 'متفوق ويحتاج تحديات إضافية.',
  },
  {
    id: 'S102',
    name: 'سارة علي',
    phone: '01123456789',
    group: 'g1',
    stars: 9,
    notes: 'مستواها ممتاز، تحتاج تركيز في الحل السريع.',
  },
  {
    id: 'S103',
    name: 'محمد حسن',
    phone: '01234567890',
    group: 'g1',
    stars: 4,
    notes: 'يحتاج متابعة في الواجبات.',
  },
  {
    id: 'S201',
    name: 'نور إبراهيم',
    phone: '01098765432',
    group: 'g2',
    stars: 7,
    notes: 'مواظبة وتتحسن باستمرار.',
  },
  {
    id: 'S202',
    name: 'يوسف عادل',
    phone: '01155667788',
    group: 'g2',
    stars: 3,
    notes: 'كثير الغياب، تم التواصل مع ولي الأمر.',
  },
  {
    id: 'S301',
    name: 'مريم خالد',
    phone: '01277889900',
    group: 'g3',
    stars: 10,
    notes: 'مشاركة رائعة في الحصة.',
  },
  {
    id: 'S302',
    name: 'عمر سعيد',
    phone: '01011223344',
    group: 'g3',
    stars: 5,
    notes: 'يحتاج دعم في الأساسيات.',
  },
];
const seedHistory = {
  S101: [1, 1, 1, 1, 0, 1],
  S102: [1, 1, 1, 1, 1, 1],
  S103: [1, 0, 1, 0, 1, 1],
  S201: [1, 1, 0, 1, 1, 1],
  S202: [0, 0, 1, 0, 1, 0],
  S301: [1, 1, 1, 1, 1, 0],
  S302: [1, 0, 1, 1, 0, 1],
};
const seedGrades = [
  {
    id: 1,
    student: 'S101',
    title: 'اختبار الفصل الأول',
    type: 'اختبار',
    score: 46,
    max: 50,
  },
  {
    id: 2,
    student: 'S102',
    title: 'اختبار الفصل الأول',
    type: 'اختبار',
    score: 49,
    max: 50,
  },
  {
    id: 3,
    student: 'S103',
    title: 'اختبار الفصل الأول',
    type: 'اختبار',
    score: 28,
    max: 50,
  },
  {
    id: 4,
    student: 'S201',
    title: 'واجب الأسبوع الثاني',
    type: 'واجب',
    score: 17,
    max: 20,
  },
  {
    id: 5,
    student: 'S202',
    title: 'واجب الأسبوع الثاني',
    type: 'واجب',
    score: 9,
    max: 20,
  },
  {
    id: 6,
    student: 'S301',
    title: 'اختبار قصير',
    type: 'اختبار',
    score: 18,
    max: 20,
  },
];
const seedFiles = [
  { id: 1, name: 'ملخص الوحدة الأولى.pdf', group: 'g1', kind: 'PDF' },
  { id: 2, name: 'مذكرة المراجعة النهائية.pdf', group: 'g2', kind: 'PDF' },
  { id: 3, name: 'ملاحظات الحصة الأخيرة', group: 'g3', kind: 'ملاحظة' },
];
const seedSlots = [
  { id: 1, day: 'السبت', time: '04:00 م', group: 'g1' },
  { id: 2, day: 'الاثنين', time: '06:00 م', group: 'g2' },
  { id: 3, day: 'الأربعاء', time: '05:00 م', group: 'g3' },
  { id: 4, day: 'الأربعاء', time: '07:00 م', group: 'g1' },
];
const seedAlerts = [
  {
    id: 1,
    text: 'اختبار شامل لمجموعة الثالث الثانوي يوم السبت القادم',
    level: 'urgent',
  },
];

const STATUS = {
  present: {
    label: 'حاضر',
    cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    on: 'bg-emerald-500 text-slate-950 shadow-[0_0_16px_rgba(16,185,129,.6)]',
  },
  late: {
    label: 'متأخر',
    cls: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    on: 'bg-amber-400 text-slate-950 shadow-[0_0_16px_rgba(251,191,36,.6)]',
  },
  absent: {
    label: 'غائب',
    cls: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    on: 'bg-rose-500 text-white shadow-[0_0_16px_rgba(244,63,94,.6)]',
  },
};
const glass = 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl';
const inp =
  'w-full bg-slate-900/70 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20 text-sm';
const btn =
  'px-4 py-3 rounded-xl font-bold text-sm transition active:scale-95 min-h-[44px]';
const btnMain = `${btn} bg-gradient-to-l from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,.35)]`;
const btnGhost = `${btn} bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10`;

const normPhone = (s) => String(s || '').replace(/\D/g, '');
const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

/* ---------- App ---------- */
export default function TeacherCenterOS() {
  const [tab, setTab] = useState('dashboard');
  const [groups] = useState(seedGroups);
  const [students, setStudents] = useState(seedStudents);
  const [history, setHistory] = useState(seedHistory);
  const [today, setToday] = useState({}); // {studentId: status}
  const [grades, setGrades] = useState(seedGrades);
  const [files, setFiles] = useState(seedFiles);
  const [slots, setSlots] = useState(seedSlots);
  const [alerts, setAlerts] = useState(seedAlerts);
  const [activeGroup, setActiveGroup] = useState('g1');
  const [toast, setToast] = useState('');

  const flash = (m) => {
    setToast(m);
    setTimeout(() => setToast(''), 2200);
  };
  const gName = (id) => groups.find((g) => g.id === id)?.name || '—';

  const stats = useMemo(() => {
    const marked = students.filter((s) => today[s.id]);
    const presentish = marked.filter((s) => today[s.id] !== 'absent').length;
    return {
      total: students.length,
      rate: marked.length ? Math.round((presentish / marked.length) * 100) : 0,
      absent: students.filter((s) => today[s.id] === 'absent').length,
      stars: students.length
        ? avg(students.map((s) => s.stars)).toFixed(1)
        : '0.0',
      marked: marked.length,
    };
  }, [students, today]);

  const mark = (id, st) =>
    setToday((t) => ({ ...t, [id]: t[id] === st ? undefined : st }));
  const addStar = (id, d) =>
    setStudents((l) =>
      l.map((s) =>
        s.id === id ? { ...s, stars: Math.max(0, s.stars + d) } : s
      )
    );

  const tabs = [
    { k: 'dashboard', l: 'الرئيسية', i: 'home' },
    { k: 'attendance', l: 'الحضور', i: 'check' },
    { k: 'students', l: 'طلابي', i: 'users' },
    { k: 'hub', l: 'المحتوى', i: 'book' },
    { k: 'parent', l: 'ولي الأمر', i: 'shield' },
    { k: 'schedule', l: 'الجدول', i: 'cal' },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-slate-950 text-slate-100 relative overflow-x-hidden"
      style={{ fontFamily: "'Cairo','Tajawal',system-ui,sans-serif" }}
    >
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 w-full">
        <div className="w-full px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black bg-gradient-to-l from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Teacher Center OS
            </h1>
            <p className="text-xs text-slate-400">
              لوحة المعلم الخاص · مجموعاتي الدراسية
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Ic n="bell" c="w-4 h-4 text-cyan-300" /> {alerts.length} تنبيه
          </div>
        </div>
        <nav className="hidden md:flex w-full px-6 gap-1 pb-2">
          {tabs.map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${
                tab === t.k
                  ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Ic n={t.i} c="w-4 h-4" /> {t.l}
            </button>
          ))}
        </nav>
      </header>

      <main className="relative w-full px-6 py-5 pb-28 md:pb-10 space-y-5">
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 border ${
              a.level === 'urgent'
                ? 'bg-rose-500/10 border-rose-400/40 text-rose-200'
                : 'bg-cyan-500/10 border-cyan-400/40 text-cyan-200'
            }`}
          >
            <Ic n="bell" c="w-5 h-5 shrink-0" />
            <span className="flex-1 text-sm font-semibold">{a.text}</span>
            <button
              aria-label="إغلاق"
              onClick={() => setAlerts((l) => l.filter((x) => x.id !== a.id))}
            >
              <Ic n="x" c="w-4 h-4" />
            </button>
          </div>
        ))}

        {tab === 'dashboard' && (
          <Dashboard
            stats={stats}
            go={setTab}
            students={students}
            gName={gName}
            today={today}
          />
        )}
        {tab === 'attendance' && (
          <Attendance
            groups={groups}
            students={students}
            today={today}
            mark={mark}
            addStar={addStar}
            active={activeGroup}
            setActive={setActiveGroup}
            save={() => {
              setHistory((h) => {
                const n = { ...h };
                students
                  .filter((s) => s.group === activeGroup && today[s.id])
                  .forEach((s) => {
                    n[s.id] = [
                      ...(n[s.id] || []),
                      today[s.id] === 'absent' ? 0 : 1,
                    ];
                  });
                return n;
              });
              setToday((t) => {
                const n = { ...t };
                students
                  .filter((s) => s.group === activeGroup)
                  .forEach((s) => delete n[s.id]);
                return n;
              });
              flash('تم حفظ حضور المجموعة');
            }}
            markAll={() =>
              setToday((t) => {
                const n = { ...t };
                students
                  .filter((s) => s.group === activeGroup)
                  .forEach((s) => (n[s.id] = 'present'));
                return n;
              })
            }
          />
        )}
        {tab === 'students' && (
          <Directory
            groups={groups}
            students={students}
            setStudents={setStudents}
            setHistory={setHistory}
            gName={gName}
            flash={flash}
          />
        )}
        {tab === 'hub' && (
          <Hub
            groups={groups}
            students={students}
            files={files}
            setFiles={setFiles}
            grades={grades}
            setGrades={setGrades}
            gName={gName}
            flash={flash}
          />
        )}
        {tab === 'parent' && (
          <Parent
            students={students}
            history={history}
            grades={grades}
            gName={gName}
          />
        )}
        {tab === 'schedule' && (
          <Schedule
            groups={groups}
            slots={slots}
            setSlots={setSlots}
            alerts={alerts}
            setAlerts={setAlerts}
            gName={gName}
            flash={flash}
          />
        )}
      </main>

      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-white/10 grid grid-cols-6"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {tabs.map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold ${
              tab === t.k ? 'text-cyan-300' : 'text-slate-500'
            }`}
          >
            <Ic
              n={t.i}
              c={`w-5 h-5 ${
                tab === t.k ? 'drop-shadow-[0_0_6px_rgba(34,211,238,.9)]' : ''
              }`}
            />{' '}
            {t.l}
          </button>
        ))}
      </nav>

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-400 text-slate-950 font-bold text-sm px-5 py-3 rounded-xl shadow-[0_0_24px_rgba(16,185,129,.6)]">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ stats, go, students, gName, today }) {
  const cards = [
    { l: 'إجمالي طلابي', v: stats.total, c: 'text-cyan-300' },
    { l: 'نسبة حضور اليوم', v: `${stats.rate}%`, c: 'text-emerald-300' },
    { l: 'الغائبون اليوم', v: stats.absent, c: 'text-rose-300' },
    { l: 'متوسط النجوم', v: stats.stars, c: 'text-amber-300' },
  ];
  const absent = students.filter((s) => today[s.id] === 'absent');
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.l} className={`${glass} p-4`}>
            <p className="text-xs text-slate-400">{c.l}</p>
            <p className={`text-3xl font-black mt-2 ${c.c}`}>{c.v}</p>
          </div>
        ))}
      </div>
      <div className={`${glass} p-4`}>
        <h2 className="font-bold mb-3">اختصارات سريعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            ['attendance', 'تسجيل الحضور'],
            ['students', 'إضافة طالب'],
            ['hub', 'رصد الدرجات'],
            ['parent', 'بوابة ولي الأمر'],
          ].map(([k, l]) => (
            <button key={k} onClick={() => go(k)} className={btnGhost}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className={`${glass} p-4`}>
        <h2 className="font-bold mb-3">الغائبون اليوم</h2>
        {absent.length === 0 ? (
          <p className="text-sm text-slate-400">
            لا يوجد غياب مسجل بعد. سجّل الحضور من تبويب الحضور.
          </p>
        ) : (
          absent.map((s) => (
            <div
              key={s.id}
              className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 text-sm"
            >
              <span>
                {s.name}{' '}
                <span className="text-slate-500 text-xs">
                  · {gName(s.group)}
                </span>
              </span>
              <a
                href={`tel:${s.phone}`}
                className="text-cyan-300 flex items-center gap-1"
              >
                <Ic n="phone" c="w-4 h-4" /> {s.phone}
              </a>
            </div>
          ))
        )}
      </div>
    </>
  );
}

/* ---------- Attendance ---------- */
function Attendance({
  groups,
  students,
  today,
  mark,
  addStar,
  active,
  setActive,
  save,
  markAll,
}) {
  const list = students.filter((s) => s.group === active);
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold border transition ${
              active === g.id
                ? 'bg-cyan-400/15 border-cyan-400/50 text-cyan-300'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={markAll} className={btnGhost}>
          تحضير الكل
        </button>
        <button onClick={save} className={btnMain}>
          حفظ حضور اليوم
        </button>
      </div>
      {list.length === 0 && (
        <p className={`${glass} p-6 text-center text-slate-400 text-sm`}>
          لا يوجد طلاب في هذه المجموعة. أضفهم من تبويب طلابي.
        </p>
      )}
      {list.map((s) => (
        <div key={s.id} className={`${glass} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">{s.name}</p>
              <p className="text-xs text-slate-500">{s.id}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="خصم نجمة"
                onClick={() => addStar(s.id, -1)}
                className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-400/30 font-black active:scale-90"
              >
                −1
              </button>
              <span className="flex items-center gap-1 text-amber-300 font-black min-w-[3rem] justify-center">
                <Ic n="star" c="w-5 h-5" fill /> {s.stars}
              </span>
              <button
                aria-label="إضافة نجمة"
                onClick={() => addStar(s.id, 1)}
                className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 font-black active:scale-90"
              >
                +1
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(STATUS).map(([k, v]) => (
              <button
                key={k}
                onClick={() => mark(s.id, k)}
                className={`py-3 rounded-xl text-sm font-bold border transition active:scale-95 ${
                  today[s.id] === k ? v.on + ' border-transparent' : v.cls
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Directory ---------- */
function Directory({
  groups,
  students,
  setStudents,
  setHistory,
  gName,
  flash,
}) {
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(null);
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return students.filter(
      (s) =>
        !t ||
        s.name.toLowerCase().includes(t) ||
        s.id.toLowerCase().includes(t) ||
        normPhone(s.phone).includes(normPhone(t) || '\u0000')
    );
  }, [q, students]);

  const submit = (f) => {
    if (!f.name.trim() || normPhone(f.phone).length < 8)
      return 'أدخل اسم الطالب ورقم هاتف صحيح لولي الأمر';
    if (f.isNew) {
      const id = 'S' + Math.floor(1000 + Math.random() * 9000);
      setStudents((l) => [
        ...l,
        {
          id,
          name: f.name.trim(),
          phone: normPhone(f.phone),
          group: f.group,
          stars: 0,
          notes: f.notes,
        },
      ]);
      setHistory((h) => ({ ...h, [id]: [] }));
      flash('تمت إضافة الطالب');
    } else {
      setStudents((l) =>
        l.map((s) =>
          s.id === f.id
            ? {
                ...s,
                name: f.name.trim(),
                phone: normPhone(f.phone),
                group: f.group,
                notes: f.notes,
              }
            : s
        )
      );
      flash('تم تحديث البيانات');
    }
    setModal(null);
    return '';
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Ic n="search" c="w-4 h-4" />
          </span>
          <input
            className={`${inp} pr-10`}
            placeholder="ابحث بالاسم أو الكود أو هاتف ولي الأمر"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <button
          onClick={() =>
            setModal({
              isNew: true,
              name: '',
              phone: '',
              group: groups[0].id,
              notes: '',
            })
          }
          className={btnMain}
        >
          <span className="flex items-center gap-1">
            <Ic n="plus" c="w-4 h-4" /> طالب
          </span>
        </button>
      </div>
      <div className={`${glass} overflow-x-auto`}>
        <table className="w-full text-sm min-w-[620px]">
          <thead className="text-slate-400 text-xs">
            <tr className="border-b border-white/10">
              {[
                'الكود',
                'الاسم',
                'المجموعة',
                'هاتف ولي الأمر',
                'النجوم',
                '',
              ].map((h) => (
                <th key={h} className="p-3 text-right font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="border-b border-white/5 last:border-0 hover:bg-white/5"
              >
                <td className="p-3 text-cyan-300 font-mono">{s.id}</td>
                <td className="p-3 font-bold">{s.name}</td>
                <td className="p-3 text-slate-400">{gName(s.group)}</td>
                <td className="p-3" dir="ltr">
                  <span className="block text-right">{s.phone}</span>
                </td>
                <td className="p-3 text-amber-300 font-bold">{s.stars} ★</td>
                <td className="p-3">
                  <div className="flex gap-2 justify-end">
                    <button
                      aria-label="تعديل"
                      onClick={() => setModal({ ...s, isNew: false })}
                      className="p-2 rounded-lg bg-white/5 text-cyan-300"
                    >
                      <Ic n="edit" c="w-4 h-4" />
                    </button>
                    <button
                      aria-label="حذف"
                      onClick={() => {
                        if (window.confirm(`حذف الطالب ${s.name}؟`)) {
                          setStudents((l) => l.filter((x) => x.id !== s.id));
                          flash('تم حذف الطالب');
                        }
                      }}
                      className="p-2 rounded-lg bg-white/5 text-rose-300"
                    >
                      <Ic n="trash" c="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500">
                  لا توجد نتائج مطابقة للبحث.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modal && (
        <StudentModal
          init={modal}
          groups={groups}
          onSubmit={submit}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

function StudentModal({ init, groups, onSubmit, onClose }) {
  const [f, setF] = useState(init);
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-5 space-y-3"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-black text-lg">
            {f.isNew ? 'إضافة طالب جديد' : 'تعديل بيانات الطالب'}
          </h3>
          <button aria-label="إغلاق" onClick={onClose}>
            <Ic n="x" />
          </button>
        </div>
        <input
          className={inp}
          placeholder="اسم الطالب"
          value={f.name}
          onChange={set('name')}
        />
        <input
          className={inp}
          placeholder="هاتف ولي الأمر"
          inputMode="tel"
          value={f.phone}
          onChange={set('phone')}
        />
        <select className={inp} value={f.group} onChange={set('group')}>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <textarea
          className={inp}
          rows="3"
          placeholder="ملاحظاتي الخاصة عن الطالب"
          value={f.notes}
          onChange={set('notes')}
        />
        {err && <p className="text-rose-300 text-sm">{err}</p>}
        <div className="flex gap-2">
          <button
            className={`${btnMain} flex-1`}
            onClick={() => setErr(onSubmit(f))}
          >
            حفظ
          </button>
          <button className={btnGhost} onClick={onClose}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Materials & Hub ---------- */
function Hub({
  groups,
  students,
  files,
  setFiles,
  grades,
  setGrades,
  gName,
  flash,
}) {
  const [fn, setFn] = useState('');
  const [fg, setFg] = useState(groups[0].id);
  const [fk, setFk] = useState('PDF');
  const [g, setG] = useState({
    student: students[0]?.id || '',
    title: '',
    type: 'اختبار',
    score: '',
    max: '',
  });
  const nameOf = (id) =>
    students.find((s) => s.id === id)?.name || 'طالب محذوف';

  const addFile = () => {
    if (!fn.trim()) return flash('اكتب اسم الملف أولاً');
    setFiles((l) => [
      { id: Date.now(), name: fn.trim(), group: fg, kind: fk },
      ...l,
    ]);
    setFn('');
    flash('تمت إضافة الملف');
  };
  const addGrade = () => {
    const sc = parseFloat(g.score),
      mx = parseFloat(g.max);
    if (
      !g.student ||
      !g.title.trim() ||
      isNaN(sc) ||
      isNaN(mx) ||
      mx <= 0 ||
      sc < 0 ||
      sc > mx
    )
      return flash('تحقق من بيانات الدرجة');
    setGrades((l) => [
      { id: Date.now(), ...g, title: g.title.trim(), score: sc, max: mx },
      ...l,
    ]);
    setG({ ...g, title: '', score: '', max: '' });
    flash('تم رصد الدرجة');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <section className={`${glass} p-4 space-y-3`}>
        <h2 className="font-bold">ملفات ومذكرات الحصص</h2>
        <input
          className={inp}
          placeholder="اسم الملف أو الملاحظة"
          value={fn}
          onChange={(e) => setFn(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            className={inp}
            value={fg}
            onChange={(e) => setFg(e.target.value)}
          >
            {groups.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
          <select
            className={inp}
            value={fk}
            onChange={(e) => setFk(e.target.value)}
          >
            <option>PDF</option>
            <option>ملاحظة</option>
          </select>
        </div>
        <button className={`${btnMain} w-full`} onClick={addFile}>
          إضافة للمحتوى
        </button>
        {files.length === 0 && (
          <p className="text-sm text-slate-500">لم ترفع أي محتوى بعد.</p>
        )}
        {files.map((f) => (
          <div
            key={f.id}
            className="flex items-center gap-3 bg-slate-900/60 rounded-xl p-3"
          >
            <span className="text-cyan-300">
              <Ic n="file" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{f.name}</p>
              <p className="text-xs text-slate-500">
                {gName(f.group)} · {f.kind}
              </p>
            </div>
            <button
              aria-label="حذف"
              onClick={() => setFiles((l) => l.filter((x) => x.id !== f.id))}
              className="text-rose-300 p-2"
            >
              <Ic n="trash" c="w-4 h-4" />
            </button>
          </div>
        ))}
      </section>

      <section className={`${glass} p-4 space-y-3`}>
        <h2 className="font-bold">درجات الاختبارات والواجبات</h2>
        <select
          className={inp}
          value={g.student}
          onChange={(e) => setG({ ...g, student: e.target.value })}
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <input
            className={inp}
            placeholder="عنوان الاختبار/الواجب"
            value={g.title}
            onChange={(e) => setG({ ...g, title: e.target.value })}
          />
          <select
            className={inp}
            value={g.type}
            onChange={(e) => setG({ ...g, type: e.target.value })}
          >
            <option>اختبار</option>
            <option>واجب</option>
          </select>
          <input
            className={inp}
            placeholder="الدرجة"
            inputMode="decimal"
            value={g.score}
            onChange={(e) => setG({ ...g, score: e.target.value })}
          />
          <input
            className={inp}
            placeholder="من"
            inputMode="decimal"
            value={g.max}
            onChange={(e) => setG({ ...g, max: e.target.value })}
          />
        </div>
        <button className={`${btnMain} w-full`} onClick={addGrade}>
          رصد الدرجة
        </button>
        <div className="max-h-80 overflow-y-auto space-y-2">
          {grades.map((r) => {
            const pct = Math.round((r.score / r.max) * 100);
            return (
              <div
                key={r.id}
                className="flex items-center gap-3 bg-slate-900/60 rounded-xl p-3 text-sm"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{nameOf(r.student)}</p>
                  <p className="text-xs text-slate-500">
                    {r.type} · {r.title}
                  </p>
                </div>
                <span
                  className={`font-black ${
                    pct >= 85
                      ? 'text-emerald-300'
                      : pct >= 50
                      ? 'text-amber-300'
                      : 'text-rose-300'
                  }`}
                >
                  {r.score}/{r.max}
                </span>
                <button
                  aria-label="حذف"
                  onClick={() =>
                    setGrades((l) => l.filter((x) => x.id !== r.id))
                  }
                  className="text-rose-300 p-1"
                >
                  <Ic n="x" c="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ---------- Parent Portal ---------- */
function Parent({ students, history, grades, gName }) {
  const [q, setQ] = useState('');
  const [res, setRes] = useState(null); // null = not searched, false = not found, object = found
  const lookup = () => {
    const t = q.trim();
    if (!t) return;
    const s = students.find(
      (x) =>
        x.id.toLowerCase() === t.toLowerCase() ||
        (normPhone(t).length >= 8 && normPhone(x.phone) === normPhone(t))
    );
    setRes(s || false);
  };
  const info = useMemo(() => {
    if (!res) return null;
    const h = history[res.id] || [];
    const gs = grades.filter((x) => x.student === res.id);
    return {
      att: h.length
        ? Math.round((h.reduce((a, b) => a + b, 0) / h.length) * 100)
        : 0,
      sessions: h.length,
      exam: gs.length
        ? Math.round(avg(gs.map((x) => (x.score / x.max) * 100)))
        : null,
      gs,
    };
  }, [res, history, grades]);

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className={`${glass} p-5 space-y-3 text-center`}>
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950 flex items-center justify-center shadow-[0_0_24px_rgba(34,211,238,.5)]">
          <Ic n="shield" c="w-7 h-7" />
        </div>
        <h2 className="font-black text-lg">بوابة ولي الأمر</h2>
        <p className="text-sm text-slate-400">
          أدخل رقم هاتفك المسجل أو كود الطالب لمتابعة مستوى ابنك
        </p>
        <input
          className={`${inp} text-center`}
          placeholder="01XXXXXXXXX أو S101"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setRes(null);
          }}
          onKeyDown={(e) => e.key === 'Enter' && lookup()}
        />
        <button className={`${btnMain} w-full`} onClick={lookup}>
          عرض التقرير
        </button>
      </div>
      {res === false && (
        <p className="bg-rose-500/10 border border-rose-400/30 text-rose-200 rounded-2xl p-4 text-sm text-center">
          لم يتم العثور على طالب بهذه البيانات. راجع الرقم أو الكود وحاول مرة
          أخرى.
        </p>
      )}
      {res && info && (
        <div className={`${glass} p-5 space-y-4`}>
          <div>
            <p className="text-xl font-black">{res.name}</p>
            <p className="text-xs text-slate-400">
              {gName(res.group)} · {res.id}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-900/60 rounded-xl p-3">
              <p className="text-2xl font-black text-emerald-300">
                {info.att}%
              </p>
              <p className="text-[11px] text-slate-400">
                الحضور ({info.sessions} حصة)
              </p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-3">
              <p className="text-2xl font-black text-cyan-300">
                {info.exam === null ? '—' : info.exam + '%'}
              </p>
              <p className="text-[11px] text-slate-400">متوسط الدرجات</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-3">
              <p className="text-2xl font-black text-amber-300">{res.stars}★</p>
              <p className="text-[11px] text-slate-400">النجوم</p>
            </div>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-cyan-400 to-emerald-400"
              style={{ width: `${info.att}%` }}
            />
          </div>
          {info.gs.length > 0 && (
            <div className="space-y-1 text-sm">
              {info.gs.map((x) => (
                <div key={x.id} className="flex justify-between text-slate-300">
                  <span>{x.title}</span>
                  <span className="font-bold">
                    {x.score}/{x.max}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-4">
            <p className="text-xs text-cyan-300 font-bold mb-1">
              ملاحظات المعلم
            </p>
            <p className="text-sm text-slate-200">
              {res.notes || 'لا توجد ملاحظات حالياً.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Schedule & Alerts ---------- */
function Schedule({
  groups,
  slots,
  setSlots,
  alerts,
  setAlerts,
  gName,
  flash,
}) {
  const [s, setS] = useState({ day: DAYS[0], time: '', group: groups[0].id });
  const [msg, setMsg] = useState('');
  const [lvl, setLvl] = useState('urgent');
  const addSlot = () => {
    if (!s.time.trim()) return flash('حدد وقت الحصة');
    setSlots((l) => [...l, { id: Date.now(), ...s, time: s.time.trim() }]);
    setS({ ...s, time: '' });
    flash('تمت إضافة الموعد');
  };
  const addAlert = () => {
    if (!msg.trim()) return flash('اكتب نص التنبيه');
    setAlerts((l) => [{ id: Date.now(), text: msg.trim(), level: lvl }, ...l]);
    setMsg('');
    flash('تم نشر التنبيه');
  };
  return (
    <div className="space-y-4">
      <section className={`${glass} p-4 space-y-3`}>
        <h2 className="font-bold">تنبيه جديد (اختبار قادم أو إعلان)</h2>
        <input
          className={inp}
          placeholder="مثال: اختبار الوحدة الثانية الأحد القادم"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <div className="flex gap-2">
          <select
            className={inp}
            value={lvl}
            onChange={(e) => setLvl(e.target.value)}
          >
            <option value="urgent">عاجل</option>
            <option value="info">معلومة</option>
          </select>
          <button className={btnMain} onClick={addAlert}>
            نشر
          </button>
        </div>
      </section>
      <section className={`${glass} p-4 space-y-3`}>
        <h2 className="font-bold">إضافة موعد حصة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <select
            className={inp}
            value={s.day}
            onChange={(e) => setS({ ...s, day: e.target.value })}
          >
            {DAYS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <input
            className={inp}
            placeholder="الوقت مثل 05:00 م"
            value={s.time}
            onChange={(e) => setS({ ...s, time: e.target.value })}
          />
          <select
            className={inp}
            value={s.group}
            onChange={(e) => setS({ ...s, group: e.target.value })}
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          <button className={btnMain} onClick={addSlot}>
            إضافة
          </button>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DAYS.map((d) => {
          const ds = slots.filter((x) => x.day === d);
          return (
            <div key={d} className={`${glass} p-3 min-h-[110px]`}>
              <p className="font-black text-cyan-300 mb-2">{d}</p>
              {ds.length === 0 && (
                <p className="text-xs text-slate-600">يوم راحة</p>
              )}
              {ds.map((x) => (
                <div
                  key={x.id}
                  className="flex items-center justify-between bg-slate-900/60 rounded-lg p-2 mb-1.5 text-xs"
                >
                  <div>
                    <p className="font-bold text-emerald-300">{x.time}</p>
                    <p className="text-slate-400">{gName(x.group)}</p>
                  </div>
                  <button
                    aria-label="حذف"
                    onClick={() =>
                      setSlots((l) => l.filter((y) => y.id !== x.id))
                    }
                    className="text-rose-300 p-1"
                  >
                    <Ic n="x" c="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </section>
      {alerts.length > 0 && (
        <button className={btnGhost} onClick={() => setAlerts([])}>
          مسح كل التنبيهات
        </button>
      )}
    </div>
  );
}
