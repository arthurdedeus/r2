export const db = {
  users: [
    {
      id: 1,
      name: "Arthur",
      email: "john.doe@example.com",
    },
  ],
  habitGroups: [
    {
      id: 1,
      userId: 1,
      year: 2025,
      month: 2,
      habits: [
        {
          id: 1,
          name: "Creatina",
          marks: Array(28).fill(""),
        },
        {
          id: 2,
          name: "Café",
          marks: Array(28).fill(""),
        },
      ],
    },
    {
      id: 2,
      userId: 1,
      year: 2025,
      month: 3,
      habits: [
        {
          id: 1,
          name: "Creatina",
          marks: Array(31).fill(""),
        },
        {
          id: 2,
          name: "Café",
          marks: Array(31).fill(""),
        },
      ],
    },
  ],
};
