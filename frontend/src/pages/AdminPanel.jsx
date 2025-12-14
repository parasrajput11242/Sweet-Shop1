import { useEffect, useState } from "react";
import api from "../api/axios";
import SweetForm from "../components/SweetForm";
import SweetCard from "../components/SweetCard";
import { isAdmin } from "../utils/auth";

export default function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [editing, setEditing] = useState(null);

  if (!isAdmin()) {
    return <p className="p-6 text-red-600">Access Denied</p>;
  }

  const load = async () => {
    const res = await api.get("/api/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const saveSweet = async (data) => {
    if (editing) {
      await api.put(`/api/sweets/${editing._id}`, data);
    } else {
      await api.post("/api/sweets", data);
    }
    setEditing(null);
    load();
  };

  const deleteSweet = async (_id) => {
    console.log("DELETING ID:", _id); 
    await api.delete(`/api/sweets/${_id}`);
    load();
  };

  return (
    <div className="p-6">
      <SweetForm onSubmit={saveSweet} editingSweet={editing} />

      <div className="grid md:grid-cols-3 gap-4">
        {sweets.map((s) => (
          <SweetCard
            key={s._id}              
            sweet={s}
            isAdmin
            onEdit={() => setEditing(s)}   
            onDelete={() => deleteSweet(s._id)} 
          />
        ))}
      </div>
    </div>
  );
}