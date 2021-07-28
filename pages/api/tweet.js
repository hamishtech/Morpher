import { getSession, useSession } from "next-auth/client";
import Twit from "twit";
import { supabase } from "../../utils/supabaseClient";


export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.userID);

    if (error) throw error;

    if (data) {
      let T = new Twit({
        consumer_key: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET,
        access_token: data[0].access_token,
        access_token_secret: data[0].access_secret,
        timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
        strictSSL: true, // optional - requires SSL certificates to be valid.
      });

      T.post(
        "statuses/update",
        { status: req.body.tweet },
        function (err, data, response) {
          console.log(data);
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
