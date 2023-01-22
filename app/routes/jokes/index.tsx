import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async () => {
   const count = await db.joke.count();
   const randomRowNumber = Math.floor(Math.random() * count);
   const [randomJoke] = await db.joke.findMany({
      take: 1,
      skip: randomRowNumber,
   });
   if (!randomJoke) {
      throw new Response("No random joke found", {
         status: 404,
      });
   }
   return json({ randomJoke });
};

export default function JokesIndexRoute() {
   const data = useLoaderData<typeof loader>();

   return (
      <div>
         <p>Here's a random joke:</p>
         <p>{data.randomJoke.content}</p>
         <Link to={data.randomJoke.id}>"{data.randomJoke.name}" Permalink</Link>
      </div>
   );
}
