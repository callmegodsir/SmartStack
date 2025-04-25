import type { NextPage } from 'next';
import Head from 'next/head';
import TestButton from '../components/TestButton';

const TestN8NPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Test N8N Connection</title>
        <meta name="description" content="Test de connexion avec N8N" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Test de connexion avec N8N</h1>
        
        <div className="w-full max-w-md">
          <TestButton />
        </div>
      </main>
    </div>
  );
};

export default TestN8NPage;