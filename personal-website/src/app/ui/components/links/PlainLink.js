import Link from 'next/link';
import '@/app/globals.css';

export default function PlainLink({ href, children, ...props }) {
    return (
        <Link href={href} className='plainLink'>
            {children}
        </Link>
    );
}