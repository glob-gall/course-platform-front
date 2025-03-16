import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';




export async function verifyPublicSession(){
 
  const cookieStore = await cookies()
  const token = cookieStore.get('user-token')
  
  if(token) redirect('/')

}