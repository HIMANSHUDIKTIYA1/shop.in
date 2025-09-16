import connectDb from "../../../../middleware/mongoose";
import User from "../../../../models/User";

export async function POST(req) {
  try {
    await connectDb();

    const data = await req.json(); // get JSON from fetch
    const { email, password } = data;

    const existingUser = await User.findOne({ email , password });
    if (existingUser) {
      return new Response({message: "Login Successful"} , { status: 200 })
    }
    return new Response({message: "Invalid Credentials"} , { status: 400 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
