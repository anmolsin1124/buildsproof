'use client';
import UserProfilePage from '@/components/UserProfilePage';
import { useParams } from 'next/navigation';

export default function Page() { const { userId } = useParams(); return <UserProfilePage userId={userId} />; }
