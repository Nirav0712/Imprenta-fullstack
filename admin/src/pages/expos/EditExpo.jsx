import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { expoService } from "../../services/expoService";
import ExpoForm from "../../components/expos/ExpoForm";

const EditExpo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expoData, setExpoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpo = async () => {
      try {
        setLoading(true);
        const res = await expoService.getExpoById(id);
        if (res.expo) {
          setExpoData(res.expo);
        } else {
          alert("Expo not found.");
          navigate("/expos");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to load Expo details.");
        navigate("/expos");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchExpo();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 animate-pulse font-semibold">
        Loading Expo details...
      </div>
    );
  }

  if (!expoData) return null;

  return (
    <div>
      <ExpoForm isEdit={true} initialData={expoData} expoId={id} />
    </div>
  );
};

export default EditExpo;
