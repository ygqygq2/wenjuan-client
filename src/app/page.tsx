import { Inter } from 'next/font/google';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Layout></Layout>
      <Navbar></Navbar>
      <Footer></Footer>
    </main>
  );
}
