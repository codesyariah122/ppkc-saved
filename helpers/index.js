export const FetchData = async(url) => {
	const fetchs = await fetch(url)
	try{
		return fetchs.json()
	}catch(err){
		console.error(err)
	}
}

export const LoginProfile = async(url, data) => {
	const login = await fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},

		body: JSON.stringify(data)
	})

	try{
		return login.json()
	}catch(err){
		console.log(err)
	}

}