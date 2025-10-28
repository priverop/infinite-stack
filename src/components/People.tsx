interface PeopleProps {
  people: number;
  maxPeople: number;
}

export default function People({ people, maxPeople }: PeopleProps) {
  return (
    <div className="text-left mt-5 border border-indigo-500 p-3 rounded-md">
      Team Size: {people}/{maxPeople}
    </div>
  );
}
