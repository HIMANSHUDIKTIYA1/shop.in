import User from '../../../../models/User';
import connectDb from '../../../../middleware/mongoose';
export async function POST(req) {
  try {
    await connectDb();

    const data = await req.json(); // get JSON from fetch
    const { username, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User Already Exists" }), { status: 400 });
    }

    const user = await User.create({ name: username, email, password });
    return new Response(JSON.stringify({ message: "User Created Successfully", user }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
