import DisplayLayout from "../../components/DisplayLayout";

function Native() {
  return (
    <DisplayLayout>
      <section className="min-h-screen w-full flex flex-col items-center justify-start pt-18 pb-10 px-6">
        <div className="w-full flex justify-center">
          <iframe
            src="/SDK V1.pdf"
            className="w-full h-[100vh] border-4 border-[#1b4332] rounded-2xl shadow-2xl"
            title="CalSci Electrical Documentation"
          ></iframe>
        </div>
      </section>
    </DisplayLayout>
  );
}

export default Native;

