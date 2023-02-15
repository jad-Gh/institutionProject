import logo from './logo.svg';
import './App.scss';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Institution from './Institution/Institution';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

	useEffect(()=>{
		
	},[])

	return (
		<div className="App">
			<ToastContainer/> 
			<BrowserRouter>
				<Routes>
					<Route index element={<Login />} />
					<Route path="institution" element={<Institution />} exact />
					<Route path="*" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
