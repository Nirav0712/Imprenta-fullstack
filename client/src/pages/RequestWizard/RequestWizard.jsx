import Stepper from "../../components/requestWizard/Stepper";
import OptionSelector from "../../components/requestWizard/OptionSelector";
import UploadArtwork from "../../components/requestWizard/UploadArtwork";
import CompanyDetails from "../../components/requestWizard/CompanyDetails";
import ReviewOrder from "../../components/requestWizard/ReviewOrder";
import SuccessScreen from "../../components/requestWizard/SuccessScreen";
import { useLocation } from "react-router-dom";

import { useState } from "react";
import { submitInquiry } from "../../services/api";

const RequestWizard = () => {
  const location = useLocation();

  const selectedTemplate = location.state?.template || null;

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [formData, setFormData] = useState({
    product: selectedTemplate?.name || "Custom Quote",
    quantity: "250",
    material: "Paper",
    finish: "Matte",
    printing: "Double Side",
    size: "A5",
    artwork: null,
    company: "",
    person: "",
    email: "",
    phone: "",
    gst: "",
    city: "",
    state: "",
    address: "",
    notes: "",
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const submitData = {
        name: formData.person || "Contact Person",
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        product: formData.product,
        message: formData.notes,
        quantity: formData.quantity,
        material: formData.material,
        finish: formData.finish,
        printing: formData.printing,
        size: formData.size,
        gst: formData.gst,
        city: formData.city,
        state: formData.state,
        address: formData.address,
      };
      const response = await submitInquiry(submitData);
      if (response?.data?._id) {
        setRequestId(response.data._id);
      } else {
        setRequestId("IMP-" + Math.floor(1000 + Math.random() * 9000));
      }
      setStep(5);
    } catch (err) {
      console.error(err);
      setRequestId("IMP-" + Math.floor(1000 + Math.random() * 9000));
      setStep(5);
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <section className="min-h-screen bg-gradient-to-b from-[#071321] via-[#08192E] to-[#071321] py-12">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <Stepper
          currentStep={step}
          setCurrentStep={setStep}
        />

        <div className="mt-12">

          {step === 1 && (
            <OptionSelector
              template={selectedTemplate}
              formData={formData}
              updateFormData={updateFormData}
              next={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <UploadArtwork
              formData={formData}
              updateFormData={updateFormData}
              next={() => setStep(3)}
              back={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <CompanyDetails
              formData={formData}
              updateFormData={updateFormData}
              next={() => setStep(4)}
              back={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <ReviewOrder
              formData={formData}
              onSubmit={handleSubmit}
              submitting={submitting}
              back={() => setStep(3)}
            />
          )}

          {step === 5 && (
            <SuccessScreen requestId={requestId} />
          )}

        </div>

      </div>

    </section>

  );

};

export default RequestWizard;