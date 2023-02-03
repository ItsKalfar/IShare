import { getSession } from "next-auth/react";

const handler = async (req: any, res: any) => {
  const session = await getSession({ req });

  if (session) return res.send(session);
  return res.send("Not Authenticated");
};

export default function userInterface() {
  return <div>userInterface</div>;
}
