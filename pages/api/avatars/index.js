import { getSession, useSession } from "next-auth/client";
import { supabase } from "../../../utils/supabaseClient";
import Twit from "twit";
const imageToBase64 = require("image-to-base64");

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
          console.log(response.data);
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

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.userID);

    try {
      if (req.body.url && data) {
        let T = new Twit({
          consumer_key: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET,
          access_token: data[0].access_token,
          access_token_secret: data[0].access_secret,
          timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
          strictSSL: true, // optional - requires SSL certificates to be valid.
        });

        imageToBase64(req.body.url) // Image URL
          .then((response) => {
            T.post(
              "account/update_profile_image",
              {
                image: response,
              },
              function (err, data, response) {
                console.log(data);
              }
            );
          })
          .catch((error) => {
            console.log(error); // Logs an error if there was one
          });
      }
    } catch (error) {
      console.log(error);
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
