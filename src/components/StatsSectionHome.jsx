import homeContent from "../data/homeContent";

function StatsSection() {
  return (
    <section className="bg-[#111827] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:justify-between">
        {homeContent.stats.map((product) => (
          <div key={product.label}>
            <p className="text-3xl font-bold text-[#181104] text-center">
              {product.value}
            </p>
            <p className="mt-2 text-sm text-gray-900 text-center">
              {product.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
