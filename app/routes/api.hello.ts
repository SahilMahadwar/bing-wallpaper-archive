import { json, LoaderFunctionArgs } from "@vercel/remix";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ hello: "world" }, 200);
};
