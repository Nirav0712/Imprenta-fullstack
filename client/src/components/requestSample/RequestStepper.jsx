import {
  FiCheck,
  FiLayers,
  FiBox,
  FiUpload,
  FiUser,
  FiClipboard,
} from "react-icons/fi";

const steps = [
  {
    id: 1,
    title: "Template",
    icon: <FiLayers />,
  },
  {
    id: 2,
    title: "Options",
    icon: <FiBox />,
  },
  {
    id: 3,
    title: "Upload",
    icon: <FiUpload />,
  },
  {
    id: 4,
    title: "Details",
    icon: <FiUser />,
  },
  {
    id: 5,
    title: "Review",
    icon: <FiClipboard />,
  },
];

const RequestStepper = ({ currentStep = 1 }) => {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        <div className="relative">

          {/* Background Line */}
          <div className="absolute left-0 right-0 top-7 hidden h-[2px] bg-white/10 md:block" />

          {/* Progress Line */}
          <div
            className="absolute left-0 top-7 hidden h-[2px] bg-sky-400 transition-all duration-700 md:block"
            style={{
              width: `${((currentStep - 1) / 4) * 100}%`,
            }}
          />

          {/* Steps */}
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-5">

            {steps.map((step) => {
              const completed = step.id < currentStep;
              const active = step.id === currentStep;

              return (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center text-center"
                >

                  {/* Circle */}
                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border
                      text-lg
                      transition-all
                      duration-500

                      ${
                        completed
                          ? "border-sky-400 bg-sky-500 text-white"
                          : active
                          ? "border-sky-400 bg-sky-500/15 text-sky-300 shadow-[0_0_25px_rgba(56,189,248,.35)]"
                          : "border-white/10 bg-white/5 text-slate-500"
                      }
                    `}
                  >
                    {completed ? <FiCheck /> : step.icon}
                  </div>

                  {/* Title */}
                  <h4
                    className={`
                      mt-4
                      text-sm
                      font-semibold

                      ${
                        active
                          ? "text-white"
                          : completed
                          ? "text-sky-300"
                          : "text-slate-500"
                      }
                    `}
                  >
                    {step.title}
                  </h4>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};

export default RequestStepper;