const Error = ({
  message,
  code,
  stack,
}: {
  message: string;
  code: number;
  stack: any;
}) => {
  return (
    <div className="bg-gray-100 min-h-screen relative items-center flex">
      <main className="mx-auto container py-10 xl:px-30 lg:px-10 px-4 font-sans pb-15">
        <div className="flex flex-col text-gray-600 items-center">
          <div className="flex flex-row items-center">
            <h1 className="text-5xl font-bold border-r pr-4">{code}</h1>
            <h3 className="italic pl-4">{message}</h3>
          </div>
          {stack && (
            <pre className="text-red-800 bg-orange-100 rounded-lg mt-10 p-5 whitespace-pre-line">
              {stack}
            </pre>
          )}
        </div>
      </main>
    </div>
  );
};

export default Error;
