import SingleCandidate from './SingleCandidate';

const devs = [
  {
    title: 'Junior Developer',
    image: 'preview.jpg',
    description: 'Increases website production by 1/sec.',
    cost: '1000'
  },
  {
    title: 'Mid Developer',
    image: 'preview.jpg',
    description: 'Increases website production by 2/sec.',
    cost: '2000'
  },
  {
    title: 'Senior Developer',
    image: 'preview.jpg',
    description: 'Increases website production by 3/sec.',
    cost: '3000'
  }
];

const sales = [
  {
    title: 'Trainee Salesperson',
    image: 'preview.jpg',
    description: 'Increases website selling by 1/sec.',
    cost: '1000'
  },
  {
    title: 'Senior Salesperson',
    image: 'preview.jpg',
    description: 'Increases website selling by 5/sec.',
    cost: '4500'
  },
  {
    title: 'B2B specialist Salesperson',
    image: 'preview.jpg',
    description: 'Increases website selling by 10/sec.',
    cost: '8000'
  }
];

export default function HirePanel() {
  const listDevs = devs.map((dev) => <SingleCandidate candidate={dev} />);
  const listSales = sales.map((salesperson) => <SingleCandidate candidate={salesperson} />);
  return (
    <div className="text-left p-4">
      <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mt-4 mb-4">
        Development
      </h4>
      <ul>{listDevs}</ul>
      <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mt-8 mb-4">
        Sales
      </h4>
      <ul>{listSales}</ul>
    </div>
  );
}
