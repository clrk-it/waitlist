export function MeshGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Base background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Mivro brand accent blobs - using amber/yellow and UTD colors */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.12]"
        style={{ backgroundColor: "#fbbf24" }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.10]"
        style={{ backgroundColor: "#c75b12" }}
      />
      {/* UTD green accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.08]"
        style={{ backgroundColor: "#008542" }}
      />
    </div>
  );
}
