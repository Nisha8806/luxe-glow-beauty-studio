import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  Search,
  RefreshCw,
  LogOut,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function AdminDashboard({ user, onLogout }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [viewFilter, setViewFilter] = useState('all');
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(
  (appointment) => appointment.appointment_date === today
);

const upcomingAppointments = appointments.filter(
  (appointment) => appointment.appointment_date > today
);

const pastAppointments = appointments.filter(
  (appointment) => appointment.appointment_date < today
);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchAppointments = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching appointments:', error);
      alert(error.message);
    } else {
      setAppointments(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id);

  if (error) {
    alert(error.message);
    return;
  }

  setAppointments((current) =>
    current.map((appointment) =>
      appointment.id === id
        ? { ...appointment, status }
        : appointment
    )
  );
};

// ADD THIS BELOW
const deleteAppointment = async (id) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this appointment?'
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) {
    alert(error.message);
    return;
  }

  setAppointments((current) =>
    current.filter((appointment) => appointment.id !== id)
  );
};
  const stats = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter((a) => a.status === 'pending').length,
      confirmed: appointments.filter((a) => a.status === 'confirmed').length,
      completed: appointments.filter((a) => a.status === 'completed').length,
    };
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const text = `
        ${appointment.name}
        ${appointment.email}
        ${appointment.phone}
        ${appointment.service}
      `.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesStatus =
  statusFilter === 'all' ||
  appointment.status === statusFilter;

const matchesDate =
  !dateFilter ||
  appointment.appointment_date === dateFilter;

const matchesView =
  viewFilter === 'all' ||
  (viewFilter === 'today' &&
    appointment.appointment_date === today) ||
  (viewFilter === 'upcoming' &&
    appointment.appointment_date > today) ||
  (viewFilter === 'past' &&
    appointment.appointment_date < today);

return matchesSearch && matchesStatus && matchesDate && matchesView;
    });
}, [appointments, search, statusFilter, dateFilter, viewFilter]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';

      case 'completed':
        return 'bg-blue-100 text-blue-700';

      case 'cancelled':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#292522]">
        {selectedAppointment && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
      <h2 className="text-2xl font-serif mb-4">
        Appointment Details
      </h2>

      <p><b>Name:</b> {selectedAppointment.name}</p>
      <p><b>Email:</b> {selectedAppointment.email}</p>
      <p><b>Phone:</b> {selectedAppointment.phone}</p>
      <p><b>Service:</b> {selectedAppointment.service}</p>
      <p><b>Date:</b> {selectedAppointment.appointment_date || 'Not specified'}</p>
      <p><b>Message:</b> {selectedAppointment.message || 'No message'}</p>
      <p><b>Status:</b> {selectedAppointment.status}</p>

      <button
        onClick={() => setSelectedAppointment(null)}
        className="mt-5 w-full bg-[#292522] text-white py-3 rounded-xl"
      >
        Close
      </button>
    </div>
  </div>
)}

      {/* Header */}
      <header className="bg-white border-b border-[#eee7e1]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#a47c68]">
              Luxe Glow
            </p>

            <h1 className="text-2xl md:text-3xl font-serif mt-1">
              Admin Dashboard
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your salon appointments
            </p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                       bg-[#292522] text-white text-sm
                       hover:bg-black transition"
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Welcome */}
        <div className="mb-7">
          <p className="text-sm text-gray-500">
            Logged in as
          </p>

          <p className="font-medium text-[#292522]">
            {user.email}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-2xl p-5 border border-[#eee7e1]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-3xl font-semibold mt-2">
                  {stats.total}
                </p>
              </div>

              <CalendarDays className="text-[#a47c68]" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#eee7e1]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-3xl font-semibold mt-2">
                  {stats.pending}
                </p>
              </div>

              <Clock3 className="text-[#b88942]" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#eee7e1]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-3xl font-semibold mt-2">
                  {stats.confirmed}
                </p>
              </div>

              <CheckCircle2 className="text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#eee7e1]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-3xl font-semibold mt-2">
                  {stats.completed}
                </p>
              </div>

              <CheckCircle2 className="text-blue-600" />
            </div>
          </div>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

 <div
onClick={() => {
  setDateFilter('');
  setViewFilter('today');
}}
  className="bg-white rounded-2xl p-5 border border-[#eee7e1] cursor-pointer hover:shadow-md transition"
>
    <p className="text-sm text-gray-500">Today</p>
    <p className="text-3xl font-semibold mt-2">
      {todayAppointments.length}
    </p>
  </div>

 <div
 onClick={() => {
  setDateFilter('');
  setViewFilter('upcoming');
}}
  className="bg-white rounded-2xl p-5 border border-[#eee7e1] cursor-pointer hover:shadow-md transition"
>
    <p className="text-sm text-gray-500">Upcoming</p>
    <p className="text-3xl font-semibold mt-2">
      {upcomingAppointments.length}
    </p>
  </div>

  <div
  onClick={() => {
    setDateFilter('');
    setViewFilter('past');
  }}
  className="bg-white rounded-2xl p-5 border border-[#eee7e1] cursor-pointer hover:shadow-md transition"
>
  <p className="text-sm text-gray-500">Past</p>
  <p className="text-3xl font-semibold mt-2">
    {pastAppointments.length}
  </p>
</div>
</div>

        {/* Appointments */}
        <section className="bg-white rounded-2xl border border-[#eee7e1] overflow-hidden">

          {/* Section Header */}
          <div className="p-6 border-b border-[#eee7e1]">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h2 className="text-xl font-serif">
                  Appointments
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {filteredAppointments.length} appointment
                  {filteredAppointments.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                {/* Search */}
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2.5
                               border border-[#ddd5ce] rounded-xl
                               text-sm outline-none
                               focus:ring-2 focus:ring-[#d7b9a8]"
                  />
                  <input
  type="date"
  value={dateFilter}
  onChange={(e) => setDateFilter(e.target.value)}
  className="border rounded-lg px-4 py-2"
/>
<button
  type="button"
  onClick={() => setDateFilter(today)}
  className="px-4 py-2 rounded-lg bg-[#292522] text-white text-sm hover:bg-black transition"
>
    
  Today
</button>
<button
  type="button"
  onClick={() => setDateFilter('')}
  className="px-4 py-2 rounded-lg border border-[#ddd] bg-white text-sm hover:bg-gray-50 transition"
>
  Clear
</button>
                </div>

                {/* Status filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border border-[#ddd5ce]
                             rounded-xl text-sm outline-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {/* Refresh */}
                <button
                  onClick={fetchAppointments}
                  className="flex items-center justify-center gap-2
                             px-4 py-2.5 rounded-xl
                             border border-[#ddd5ce]
                             hover:bg-[#f8f5f2] transition"
                >
                  <RefreshCw size={17} />
                  Refresh
                </button>

              </div>

            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="py-16 text-center text-gray-500">
              Loading appointments...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-16 text-center">
              <XCircle
                className="mx-auto text-gray-300 mb-3"
                size={40}
              />

              <p className="text-gray-500">
                No appointments found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px]">

                <thead className="bg-[#faf8f6]">
                  <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredAppointments.map((appointment) => (

                    <tr
                      key={appointment.id}
                      className="border-t border-[#eee7e1]
                                 hover:bg-[#fdfbf9] transition"
                    >

                      <td className="px-6 py-5">
                        <p className="font-medium">
                          {appointment.name}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          #{appointment.id}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm">
                          {appointment.email}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {appointment.phone}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm">
                        {appointment.service}
                      </td>

                      <td className="px-6 py-5 text-sm">
                        {appointment.appointment_date || '-'}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-500 max-w-xs">
                        {appointment.message || '-'}
                      </td>

                      <td className="px-6 py-5">

                        <select
                          value={appointment.status}
                          onChange={(e) =>
                            updateStatus(
                              appointment.id,
                              e.target.value
                            )
                          }
                          className={`px-3 py-2 rounded-full text-xs
                                      font-medium border-0
                                      outline-none cursor-pointer
                                      ${getStatusClass(
                                        appointment.status
                                      )}`}
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="confirmed">
                            Confirmed
                          </option>

                          <option value="completed">
                            Completed
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>
                        </select>
                      <button
  onClick={() => setSelectedAppointment(appointment)}
  className="mr-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
>
  View
</button>
                        <button
  onClick={() => deleteAppointment(appointment.id)}
  className="ml-3 px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
>
  Delete
</button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </main>
    </div>
  );
}