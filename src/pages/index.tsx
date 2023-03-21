import Head from 'next/head';
import HomePage from './home';

export default function Home() {
	return (
		<>
			<Head>
				<title>Recruitment Task</title>
				<meta name="description" content="App made for  recritment process" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<HomePage />
			</main>
		</>
	);
}
