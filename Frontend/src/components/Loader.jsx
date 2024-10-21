// Loader.js

const Loader = ({ color = "border-blue-500" }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`border-[6px] border-t-transparent border-b-transparent border-solid rounded-full animate-spin ${color}`}
        style={{
          width: "80px", // Use size directly for width
          height: "80px", // Use size directly for height
          borderTopColor: color.split("-")[1],
          animationDuration: "0.8s",
        }}
      ></div>
    </div>
  );
};

export default Loader;
