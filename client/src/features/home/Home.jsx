import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

const Home = () => {
	return (
		<div className="flex flex-col">
			<Hero />
			<About />
			<Projects />
			<Experience />
			<Skills />
			<Contact />
		</div>
	);
};

export default Home;
