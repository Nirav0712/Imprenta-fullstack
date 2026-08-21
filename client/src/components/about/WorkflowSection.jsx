import {
  FiClipboard,
  FiEdit3,
  FiBox,
  FiSettings,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";

import { workflowSteps } from "../../data/aboutData";

const icons = [
  <FiClipboard />,
  <FiEdit3 />,
  <FiBox />,
  <FiSettings />,
  <FiCheckCircle />,
  <FiTruck />,
];

const WorkflowSection = () => {
  return (
    <section className="py-24">

      <div className="w-full w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-300">

            Workflow

          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">

            Our Proven

            <span className="block text-sky-400">

              Packaging Workflow

            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">

            Every project follows a structured manufacturing process to
            ensure quality, consistency and timely delivery.

          </p>

        </div>

        {/* Timeline */}

        <div className="relative mt-20">

          {/* Center Line */}

          <div className="absolute left-8 top-0 hidden md:block h-full w-[2px] bg-gradient-to-b from-sky-500 via-cyan-400 to-transparent"></div>

         <div className="space-y-10 w-full">

            {workflowSteps.map((step, index) => (

              <div
  key={index}
  className="relative flex flex-col md:flex-row gap-8 items-start w-full"
>

                {/* Icon */}

                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-white text-2xl shadow-lg shadow-sky-500/30">

                  {icons[index]}

                </div>

                {/* Card */}

   <div className="w-full md:flex-1 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-1 px-6 transition duration-300 hover:border-sky-400/40 hover:bg-white/10">
  <div className="flex items-center justify-between gap-4">

    <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-white">

      {step.title}

    </h3>

    <span className="text-2xl sm:text-3xl pt-2 lg:text-4xl font-black text-sky-400 leading-none">

      {step.number}

    </span>

  </div>

  <p className="mt-2 text-sm sm:text-base lg:text-base text-slate-400 leading-6 lg:leading-8">

    {step.description}

  </p>

</div>
              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default WorkflowSection;