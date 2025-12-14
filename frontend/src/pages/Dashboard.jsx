import { useEffect, useState } from "react";
import api from "../api/axios";
import SweetCard from "../components/SweetCard";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");

  const load = async () => {
    const res = await api.get("/api/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const purchase = async (id) => {
    await api.post(`/api/sweets/${id}/purchase`);
    load();
  };

  const filtered = sweets.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <input
        placeholder="Search by name or category..."
        className="border p-2 w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((sweet) => (
          <SweetCard
            key={sweet.id}
            sweet={sweet}
            onPurchase={purchase}
            isAdmin={false}
          />
        ))}
      </div>
    </div>
  );
}