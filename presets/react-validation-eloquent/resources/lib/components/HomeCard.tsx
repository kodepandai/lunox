const HomeCard = ({
  index = 0,
  url = "",
  title = "",
  description = "",
  icon = "",
}) => {
  return (
    <div
      className={`w-full lg:w-1/2 flex flex-col p-5 border-b border-gray-300 ${
        index % 2 == 0 ? "lg:border-r border-r-none" : ""
      }`}
    >
      <div className="items-center flex-row flex">
        <div className={`${icon} text-gray-500 text-3xl mr-4`} />
        <div>
          <a target="__blank" href={url} className="text-gray-700 text-lg">
            {title}
          </a>
        </div>
      </div>
      <p
        className="pl-12 text-gray-500 text-sm"
        dangerouslySetInnerHTML={{ __html: description.replace("\n", "<br>") }}
      ></p>
    </div>
  );
};

export default HomeCard;
