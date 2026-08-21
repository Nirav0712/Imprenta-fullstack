import SampleHero from "../../components/requestSample/SampleHero";
import RequestToolbar from "../../components/requestSample/RequestToolbar";
import FilterSidebar from "../../components/requestSample/FilterSidebar";
import TemplateGrid from "../../components/requestSample/TemplateGrid";
import Pagination from "../../components/requestSample/Pagination";
import RequestStepper from "../../components/requestSample/RequestStepper";

const RequestSample = () => {
  return (
    <>
      <SampleHero />

      <RequestStepper currentStep={1} />


      <RequestToolbar />

      <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

    <div className="grid xl:grid-cols-[300px_1fr] gap-10">

        <FilterSidebar />

        <div>

            <TemplateGrid />

            <Pagination />

        </div>

    </div>

</div>
    </>

    
  );
};

export default RequestSample;