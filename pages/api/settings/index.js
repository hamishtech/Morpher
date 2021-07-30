import { getSession } from "next-auth/client";
import { supabase } from "../../../utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      const session = await getSession({ req });
      if (req.body.type === "banners") {
        let { error, data } = await supabase
          .from("users")
          .update({ banner_cycling: req.body.value })
          .eq("id", session.userID);
        if (error) throw error;
        if (data) {
          res.json({ success: true });
        }
      }
      if (req.body.type === "avatars") {
        let { error, data } = await supabase
          .from("users")
          .update({ avatar_cycling: req.body.value })
          .eq("id", session.userID);
        if (error) throw error;
        if (data) {
          res.json({ success: true });
        }
      }
    } catch (error) {
      res.end();
      console.log(error);
    }
  }
}
