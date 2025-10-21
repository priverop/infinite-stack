export default function SingleCandidate({ candidate }) {
  return (
    <div className="p-3 flex items-center justify-between hover:cursor-pointer hover:bg-indigo-700 rounded-xl">
      <div className="flex items-center gap-4">
        <img src={candidate.image} className="h-16 w-16" />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{candidate.title}</h3>
          <p className="text-gray-400 text-sm">{candidate.description}</p>
        </div>
      </div>

      <div className="bg-gray-700 px-6 py-2 rounded-full">
        <span className="text-lg">${candidate.cost}</span>
      </div>
    </div>
  );
}
