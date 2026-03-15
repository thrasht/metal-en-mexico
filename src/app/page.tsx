export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <h1
        className="text-4xl md:text-6xl font-bold tracking-tight text-center"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Conciertos de{" "}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Metal
        </span>{" "}
        en México
      </h1>
      <p className="mt-6 text-lg text-muted-foreground text-center max-w-xl">
        Encuentra los mejores eventos de metal cerca de ti.
        El calendario se construirá aquí.
      </p>
    </div>
  );
}
