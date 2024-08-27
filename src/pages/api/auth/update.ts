import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const newName = formData.get("displayname")?.toString();

  if (!newName) {
    return new Response(JSON.stringify({ message: "No name to update" }), {
      status: 200,
    });
  }

  const { error } = await supabase.auth.updateUser({
    data: { displayname: newName },
  });

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({ message: "user display name successfully updated" }),
    { status: 200 }
  );
};
