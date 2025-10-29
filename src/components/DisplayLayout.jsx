const DisplayLayout = ({ children }) => {
  return (
    <div className="relative w-full min-h-fit">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "#e0e8dc",
        }}
      ></div>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px", 
        }}
      ></div>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default DisplayLayout;



