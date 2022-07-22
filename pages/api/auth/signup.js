import User from '../../../models/User';
import db from '../../../utils/db';


async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }
  await db.connect();
  const existingUser = await User.findOne({ email: email });
  if(existingUser) {
    res.status(422).json({message: 'User already exists'});
    await db.disconnect();
    return
  }
}

export default handler;
