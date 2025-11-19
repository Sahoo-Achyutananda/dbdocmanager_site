import heroImg from "../assets/react.svg"; // use your own image
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">

      <Navbar />

      <section className="px-8 py-20 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">

        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold text-green-700 mb-6 leading-tight">
            Document Your Data Models <br /> With Ease.
          </h2>

          <p className="text-lg text-gray-600 mb-6">
            Create, visualize, and maintain your relational & NoSQL data 
            mappings using a simple DSL. Generate documentation, ERDs, and lineage in seconds.
          </p>

          <a
            href="/download"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Download Now
          </a>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-full"
          />
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="bg-green-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h3 className="text-3xl font-bold text-green-700 mb-8">
            See DBDocManager in Action
          </h3>

          <div className="flex justify-center">
            <video
              controls
              className="w-full md:w-3/4 rounded-lg shadow-md"
            >
              <source src="/sample-video.mp4" type="video/mp4" />
            </video>
          </div>

        </div>
      </section>

      {/* MORE FEATURES */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-green-700 text-center mb-12">
          Powerful Features You Will Love
        </h3>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg border border-green-200">
            <h4 className="text-xl font-bold text-green-600 mb-3">DSL Editor</h4>
            <p className="text-gray-600">Write structured DSL to define sources, targets, and mappings.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg border border-green-200">
            <h4 className="text-xl font-bold text-green-600 mb-3">ERD Generation</h4>
            <p className="text-gray-600">Instantly generate ER diagrams from your model definitions.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg border border-green-200">
            <h4 className="text-xl font-bold text-green-600 mb-3">Lineage View</h4>
            <p className="text-gray-600">Track column-level lineage from source to target.</p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-600 text-white py-6 text-center mt-10">
        <p>© {new Date().getFullYear()} DBDocManager — All Rights Reserved.</p>
      </footer>

    </div>
  );
}
