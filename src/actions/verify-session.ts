import { UserRole } from '@/domain/user/entity/user';
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';


interface JwtPayload {
  sub: string; // Typically the user ID or email
  user: {
    role: UserRole;
  }
}

export async function verifySession(){
  const publicKeyBase64 = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n');
  if(!publicKeyBase64) throw new Error('JWT PUBLIC KEY NOT FOUND IN .env VARIABLES')
  const publicKey = Buffer.from(publicKeyBase64, 'base64').toString('utf-8');

  const cookieStore = await cookies()
  const token = cookieStore.get('user-token')
  
  if(!token){
    redirect('/login')
  } 

  const result = jwt.verify(token.value, publicKey, {algorithms:['RS256']}) as JwtPayload

  return {
    user:{
      email: result.sub,
      role: result.user.role
    }
  }
}