function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase text-[#c9a961]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-[#171717] md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[#57534e]">{text}</p>
    </div>
  );
}

export default SectionHeading;
