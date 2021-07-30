import { getSession } from "next-auth/client";
import { supabase } from "../../../utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });
      let { error, data } = await supabase
        .from("users")
        .update({ interval: req.body.interval })
        .eq("id", session.userID);
      if (error) throw error;
      if (data) {
        res.json({ success: true });
      }
    } catch (error) {
      res.end();
      console.log(error);
    }
  }
}
