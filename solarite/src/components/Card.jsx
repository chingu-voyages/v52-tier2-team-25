import { cardData } from "@/constants/constants";

export function Card() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 relative">
      {cardData.map((data) => (
        <div
          key={data.id}
          className="w-80 h-80 text-white bg-sky-100 rounded-3xl flex flex-col items-center justify-center transition-transform hover:scale-95"
        >
          <h3 className="text-4xl text-white font-extrabold mb-2 absolute">{data.title}</h3>
          <img
            src={data.image}
            alt={`Image of ${data.title}`}
            className="object-cover object-center rounded-lg w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
