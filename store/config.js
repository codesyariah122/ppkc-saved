export const strict = false;
export const state = () => ({
	config:{
		api_url: '',
		auth: {},
		token: {},
		profiles:{},
		event:{},
		event_data: {}
	},
})

export const mutations = {
	CONFIG_API_URL(state,url){
		state.config.api_url=url
	},

	CONFIG_AUTH_LOGIN(state, data){
		state.config.auth=localStorage.setItem('token', data)
	},

	CONFIG_CHECK_LOGIN(state, name){
		state.config.token= localStorage.getItem(name) ? JSON.parse(localStorage.getItem('token')) : ''
	},


	CONFIG_SET_EVENT_LOGIN(state, data){
		state.config.event = localStorage.setItem('event', data)
	},

	CONFIG_GET_EVENT_LOGIN(state, name){
		state.config.event_data = localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : ''
	}
}

export const actions = {
	storeConfigApiUrl({commit}, url){
		commit('CONFIG_API_URL', url)
	},

	storeConfigAuth({commit}, data){
		commit('CONFIG_AUTH_LOGIN', data)
	},

	checkAuthLogin({commit}, name){
		commit('CONFIG_CHECK_LOGIN', name)
	},
	

	setEventToLogin({commit}, data){
		commit('CONFIG_SET_EVENT_LOGIN', data)
	},

	getEventDataToLogin({commit}, name){
		commit('CONFIG_GET_EVENT_LOGIN', name)
	}

}	

export const getters = {
	ConfigApiUrl(state){
		return state.config.api_url
	},
	ConfigAuthLogin(state){
		return state.config.auth
	},
	ConfigCheckLogin(state){
		return state.config.token
	},

	ConfigSetEventLogin(state){
		return state.config.event
	},

	ConfigEventDataLogin(state){
		return state.config.event_data
	}
}
