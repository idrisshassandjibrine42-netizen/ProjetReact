import homeContent from "../data/homeContent";

function StatsSection() {
  return (
    <section className="bg-[#111827] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:justify-between">
        {homeContent.stats.map((item) => (
          <div key={item.label}>
            <p className="text-3xl font-bold text-[#c9a35b]">{item.value}</p>
            <p className="mt-2 text-sm text-gray-300">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
