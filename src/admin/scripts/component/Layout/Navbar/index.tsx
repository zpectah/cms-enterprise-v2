import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
	const {} = props;

	return (
		<>
			<div>
				<Link to="/admin/">Home</Link>
				<Link to="/admin/app">Dashboard</Link>
				<Link to="/admin/app/users">Users</Link>
			</div>
		</>
	);
};

export default Navbar;