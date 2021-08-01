import { getSession, useSession } from "next-auth/client";
import { supabase } from "../../../utils/supabaseClient";
import Twit from "twit";
const imageToBase64 = require("image-to-base64");
import Twitter from "twitter-lite";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    try {
      const { data, error } = await supabase
        .from("avatars")
        .insert([{ user_id: session.userID, url: req.body.url }]);
      if (error) throw error;
      if (data) {
        const response = await supabase
          .from("avatars")
          .select("*")
          .eq("user_id", session.userID);
        if (response.data) {
          res.json(response.data);
        }
        if (response.error) throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method === "PUT") {
    const session = await getSession({ req });

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.userID);

      console.log(data);

      if (req.body.url && data) {
        const client = new Twitter({
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          access_token_key: data[0].access_token,
          access_token_secret: data[0].access_secret,
        });

        imageToBase64(req.body.url) // Image URL
          .then((response) => {
            client
              .post("account/update_profile_image", {
                image: response,
              })
              .then((response) => {
                return res.status(200).json({ success: "banner updated" });
              })
              .catch((err) => {
                res.status(299).json({ error: err.error });
              });
          })
          .catch((error) => {
            res.status(999).json({ error: "Error setting avatar" });
          });
      }
    } catch (error) {
      console.log(error);
      res.end();
    }
  }

  if (req.method === "DELETE") {
    const session = await getSession({ req });
    try {
      const { data, error } = await supabase
        .from("avatars")
        .delete()
        .eq("id", req.body.id);

      const response = await supabase
        .from("avatars")
        .select("*")
        .eq("user_id", session.userID);
      if (response.data) {
        res.json(response.data);
      }
      if (response.error) throw error;
    } catch (error) {
      console.log(error);
    }
  }
}
