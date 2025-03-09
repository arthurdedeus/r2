import { Select } from "@/components/select";

interface MonthSelectorProps {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

export const MonthSelector = ({
  month,
  year,
  onChange,
}: MonthSelectorProps) => {
  const months = [
    { key: 1, value: 1, name: "January" },
    { key: 2, value: 2, name: "February" },
    { key: 3, value: 3, name: "March" },
    { key: 4, value: 4, name: "April" },
    { key: 5, value: 5, name: "May" },
    { key: 6, value: 6, name: "June" },
    { key: 7, value: 7, name: "July" },
    { key: 8, value: 8, name: "August" },
    { key: 9, value: 9, name: "September" },
    { key: 10, value: 10, name: "October" },
    { key: 11, value: 11, name: "November" },
    { key: 12, value: 12, name: "December" },
  ];
  return (
    <div className="flex items-center gap-4 mb-4">
      <Select
        name="month"
        value={month}
        onChange={(e) => onChange(Number.parseInt(e.target.value), year)}
      >
        {months.map((month) => (
          <option key={month.key} value={month.value}>
            {month.name}
          </option>
        ))}
      </Select>
      <Select
        name="year"
        value={year}
        onChange={(e) => onChange(month, Number.parseInt(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <option key={2020 + i} value={2020 + i}>
            {2020 + i}
          </option>
        ))}
      </Select>
    </div>
  );
};
