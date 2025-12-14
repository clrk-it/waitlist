import { MeshGradientBackground } from "@/components/mesh-gradient-background";
import { InterestForm } from "@/components/interest-form";

export default function FormPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <MeshGradientBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            <InterestForm />
          </div>
        </main>
      </div>
    </div>
  );
}
