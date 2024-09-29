// Loader.js

const Loader = ({ size = "w-10 h-10", color = "border-blue-500" }) => {
  return (
    <div className={`flex justify-center items-center ${size}`}>
      <div
        className={`border-4 border-gray-200 rounded-full animate-spin ${color}`}
        style={{ borderTopColor: color.split("-")[1] }}
      ></div>
    </div>
  );
};

export default Loader;
