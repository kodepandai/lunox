import HomeCard from "../components/HomeCard";
import { Helmet } from "react-helmet";
import { useState } from "react";
const Home = ({
  VERSION = {
    app: "",
    framework: "",
  },
  data = {},
}) => {
  const cardItems = [
    {
      title: "Documentation",
      url: "https://kodepandai.github.io/lunox/",
      icon: "i-ant-design-read-outlined",
      description:
        "Lunox is Laravel-Flavoured NodeJs Framework. We trying to support all basic Laravel features but we make it as simple as possible. Please read full Documentation for detail. \n NOTE: <i>documentation still in progress</i>",
    },
    {
      title: "Vite",
      url: "https://vitejs.dev/",
      icon: "i-file-icons-vite",
      description:
        "Lunox use vite as frontend tooling. This page is build using svelte plugin vite. We will add support for other frontend framework later. For more information about vite, please visit their official website",
    },
    {
      title: "Laravel",
      url: "https://laravel.com/",
      icon: "i-file-icons-laravel",
      description:
        "Lunox is inspired by Laravel, so if you are not familiar with Laravel (PHP Framework). You can check official website for more detail.",
    },
    {
      title: "Contribution or Open Issue",
      url: "https://github.com/kodepandai/lunox-framework",
      icon: "i-ant-design-question-circle-outlined",
      description:
        "Lunox is under highly developing state. Some problems or breaking change may occure. Please create new issue on github if you have problems or questions. PR are welcome :)",
    },
  ];

  const [count, setCount] = useState(0);

  return (
    <>
      <Helmet title="Lunox">
        <title>Lunox</title>
      </Helmet>

      <div className="bg-gray-100 min-h-screen relative">
        <main className="mx-auto container py-10 xl:px-30 lg:px-10 px-4 font-sans pb-15">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center flex-nowrap">
              <img src="/images/logo.svg" alt="Lunox" width="60px" />
              <h1 className="text-6xl font-bold  ml-3">
                <span>Lu</span>
                <span className="text-yellow-600">nox</span>
              </h1>
            </div>
            <button
              className="rounded bg-yellow-600 p-2 text-white shadow"
              onClick={() => setCount((prev) => prev + 1)}
            >
              clicked {count} times
            </button>
          </div>

          <div className="flex flex-row flex-wrap g mt-10 bg-white shadow rounded-md flex-grow overflow-hidden">
            {cardItems.map(({ icon, description, title, url }, index) => (
              <HomeCard
                index={index}
                icon={icon}
                title={title}
                description={description}
                url={url}
                key={index}
              />
            ))}
          </div>

          {data && Object.keys(data).length > 0 && (
            <pre className="mt-5 rounded bg-gray-300 p-3">
              data: {JSON.stringify(data, null, 2)}
            </pre>
          )}

          <footer className="absolute bottom-0 mb-5 left-0 right-0 px-10 text-gray-500 flex flex-row justify-between text-sm font-sans">
            <a
              className="flex flex-row items-center text-gray-500"
              href="https://github.com/kodepandai/lunox"
            >
              <div className="i-ant-design-github-filled text-xl mr-1" />
              <span>kodepandai/lunox</span>
            </a>
            <div>
              Lunox v.{VERSION.app}(framework v.{VERSION.framework})
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default Home;
