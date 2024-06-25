import Header from '@/components/Header';
import '/app/globals.css';

import { ReservationProvider } from '@/components/Cabin/ReservationContext';
import { Josefin_Sans } from 'next/font/google';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | Next Wild Oasis',
    default: 'Next Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
  image: '/logo.png',
  keywords: ['wild', 'oasis', 'paradise', 'nature'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} relative flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        <Header />

        <div className='grid flex-1 px-8 py-12'>
          <main className='mx-auto w-full max-w-7xl'>
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
