import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const loader = async () => {
   const jokes = await db.joke.findMany();
   return json({ jokes });
};
