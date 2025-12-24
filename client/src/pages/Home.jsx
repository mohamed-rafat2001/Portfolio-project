import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Projects from "../components/home/Projects";
import Experience from "../components/home/Experience";
import Skills from "../components/home/Skills";
import Contact from "../components/home/Contact";

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
