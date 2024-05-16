export const Navbar = () => {
    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-4'>
			<span className='navbar-brand'>
				<i className='fas fa-calendar-alt'></i>
				<span className='ms-2'>Dani</span>
			</span>
			<button className='btn btn-outline-danger'>
				<i className='fas fa-sign-out-alt'></i>
				<span className='ms-2'>Salir</span>
			</button>
		</div>
    )
}
