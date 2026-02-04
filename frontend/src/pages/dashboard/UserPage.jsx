import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { getAllUsers, deleteUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState(null);

  const fetch = () => {
    setLoading(true);
    getAllUsers()
      .then(({ data }) => setUsers(data.users))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load users"),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteUser(toDelete._id);
      setUsers((prev) => prev.filter((u) => u._id !== toDelete._id));
      setToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
      setToDelete(null);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-xl font-semibold text-slate-100 mb-1">Users</h1>
        <p className="text-slate-500 text-sm mb-5">
          Manage all registered members
        </p>

        <ErrorMessage message={error} onClose={() => setError("")} />

        {loading ? (
          <Loading />
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                      #
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                      Username
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 hidden sm:table-cell">
                      Email
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                      Role
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 hidden md:table-cell">
                      Status
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 hidden md:table-cell">
                      Joined
                    </th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => {
                    const isSelf = u._id === currentUser?.id;
                    return (
                      <tr
                        key={u._id}
                        className="border-b border-slate-800 last:border-0 hover:bg-slate-800 transition-colors"
                      >
                        <td className="px-5 py-3 text-slate-600">{i + 1}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold text-white">
                              {u.username[0]?.toUpperCase()}
                            </div>
                            <span className="text-slate-200 font-medium">
                              {u.username}
                            </span>
                            {isSelf && (
                              <span className="text-xs text-amber-400">
                                (you)
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3 text-slate-400 hidden sm:table-cell">
                          {u.email}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${u.role === "admin" ? "bg-amber-950 text-amber-400 border-amber-800" : "bg-slate-800 text-slate-400 border-slate-700"}`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-5 py-3 hidden md:table-cell">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${u.isActive ? "bg-emerald-500" : "bg-slate-600"}`}
                          />
                          <span className="ml-1.5 text-xs text-slate-500">
                            {u.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-xs text-slate-600 hidden md:table-cell">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-3 text-right">
                          {!isSelf && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => setToDelete(u)}
                            >
                              Delete
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <ConfirmDialog
          open={!!toDelete}
          onClose={() => setToDelete(null)}
          onConfirm={handleDelete}
          title="Delete User"
          message={`Permanently delete user "${toDelete?.username}" (${toDelete?.email})? All their books will remain but ownership context is lost.`}
        />
      </div>
    </div>
  );
}
