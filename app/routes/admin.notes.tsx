import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const notes = await prisma.note.findMany({
    include: {
      user: true,
    },
  });

  return json({ notes });
}

export default function () {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <>
      <h1>NOTES</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.title} [{note.user.email}]
          </li>
        ))}
      </ul>
    </>
  );
}
