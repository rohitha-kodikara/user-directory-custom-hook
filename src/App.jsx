import { useState} from "react";
import { useFetch } from "./useFetch";

export default function App() {
  // ---------- Fetch logic ----------
  
  
 const { users, loading, error, refetch } = useFetch({ API_URL: "https://jsonplaceholder.typicode.com/users" });

  

  // ---------- Search ----------
  const [search, setSearch] = useState("");

  // ---------- Favorites ----------
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  // ---------- Derived data ----------
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">👥 User Directory</h1>
            <p className="text-sm text-gray-500">
              {users.length} users · {favorites.length} favorites
            </p>
          </div>
          <button
            onClick={refetch}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>
        </header>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            <p className="mt-3 text-gray-500">Fetching users...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="mb-3 font-medium text-red-600">⚠️ {error}</p>
            <button
              onClick={refetch}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty search result */}
        {!loading && !error && filteredUsers.length === 0 && (
          <p className="py-10 text-center text-gray-500">No users found.</p>
        )}

        {/* User cards */}
        {!loading && !error && filteredUsers.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="rounded-xl bg-white p-5 shadow transition hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(user.id)}
                    className="text-xl"
                    title="Favorite"
                  >
                    {favorites.includes(user.id) ? "⭐" : "☆"}
                  </button>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>📧 {user.email}</p>
                  <p>📞 {user.phone}</p>
                  <p>🏢 {user.company.name}</p>
                  <p>🌐 {user.website}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}