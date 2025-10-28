import SingleCandidate from './SingleCandidate';
import type { GameStats, HireFunction } from '../types';

const devs = [
  {
    title: 'Junior Developer',
    image: 'https://picsum.photos/id/1/100',
    description: 'Increases website production by 1/sec.',
    cost: 1000,
    increment: 1
  },
  {
    title: 'Mid Developer',
    image: 'https://picsum.photos/id/180/100',
    description: 'Increases website production by 2/sec.',
    cost: 2000,
    increment: 2
  },
  {
    title: 'Senior Developer',
    image: 'https://picsum.photos/id/60/100',
    description: 'Increases website production by 3/sec.',
    cost: 3000,
    increment: 3
  }
];

const sales = [
  {
    title: 'Trainee Salesperson',
    image: 'https://picsum.photos/id/48/100',
    description: 'Increases website selling by 1/sec.',
    cost: 1000,
    increment: 1
  },
  {
    title: 'Senior Salesperson',
    image: 'https://picsum.photos/id/20/100',
    description: 'Increases website selling by 5/sec.',
    cost: 4500,
    increment: 5
  },
  {
    title: 'B2B specialist Salesperson',
    image: 'https://picsum.photos/id/378/100',
    description: 'Increases website selling by 10/sec.',
    cost: 8000,
    increment: 10
  }
];

interface HireProps extends Pick<GameStats, 'money'> {
  hireDev: HireFunction;
  hireSeller: HireFunction;
}
export default function HirePanel({ hireDev, hireSeller }: HireProps) {
  const listDevs = devs.map((dev, index) => (
    <SingleCandidate key={index} onClick={hireDev} candidate={dev} />
  ));
  const listSales = sales.map((salesperson, index) => (
    <SingleCandidate key={index} onClick={hireSeller} candidate={salesperson} />
  ));
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
